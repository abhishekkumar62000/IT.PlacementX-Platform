from datetime import timedelta
import secrets

from django.contrib.auth.hashers import check_password, make_password
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone

from .models import OTP, RegistrationSession, User, UserRole


# ============================================================
# CONFIGURATION
# ============================================================

OTP_EXPIRY_MINUTES = 3
OTP_RESEND_COOLDOWN_SECONDS = 30
MAX_RESENDS = 3
MAX_ATTEMPTS = 5

REGISTRATION_SESSION_MINUTES = 10


# ============================================================
# OTP HELPERS
# ============================================================

def generate_otp():
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_otp(code):
    return make_password(code)


def verify_otp_hash(code, code_hash):
    return check_password(code, code_hash)


# ============================================================
# REGISTRATION TOKEN HELPERS
# ============================================================

def generate_registration_token():
    return secrets.token_urlsafe(48)


def hash_registration_token(token):
    return make_password(token)


def verify_registration_token(token, token_hash):
    return check_password(token, token_hash)


# ============================================================
# EMAIL
# ============================================================

def send_otp_email(email, code, purpose):
    send_mail(
        subject="Your ITPlacementX verification code",
        message=(
            f"Your OTP for {purpose} is {code}.\n\n"
            f"This OTP expires in {OTP_EXPIRY_MINUTES} minutes.\n\n"
            "If you did not request this code, "
            "please ignore this email."
        ),
        from_email=None,
        recipient_list=[email],
        fail_silently=False,
    )


# ============================================================
# CREATE OTP
# ============================================================

@transaction.atomic
def create_otp(email, purpose="registration"):

    email = email.strip().lower()
    now = timezone.now()

    if User.objects.filter(email=email).exists():
        raise ValueError(
            "An account with this email already exists."
        )

    code = generate_otp()

    otp, _ = OTP.objects.update_or_create(
        email=email,
        purpose=purpose,
        defaults={
            "code_hash": hash_otp(code),
            "expires_at": (
                now
                + timedelta(
                    minutes=OTP_EXPIRY_MINUTES
                )
            ),
            "is_used": False,
            "attempts": 0,
            "resend_count": 0,
            "last_sent_at": now,
            "blocked_until": None,
        },
    )

    send_otp_email(
        email=email,
        code=code,
        purpose=purpose,
    )

    # Return both the OTP object and the raw code so callers/tests
    # can verify delivery and behaviour that depends on the raw
    # OTP (tests expect a (otp, code) tuple).
    return otp, code


# ============================================================
# RESEND OTP
# ============================================================

@transaction.atomic
def resend_otp(email, purpose="registration"):

    email = email.strip().lower()
    now = timezone.now()

    try:
        otp = (
            OTP.objects
            .select_for_update()
            .get(
                email=email,
                purpose=purpose,
            )
        )

    except OTP.DoesNotExist:
        raise ValueError(
            "No OTP request found. Please request an OTP first."
        )

    if User.objects.filter(email=email).exists():
        raise ValueError(
            "An account with this email already exists."
        )

    if (
        otp.blocked_until
        and now < otp.blocked_until
    ):
        raise ValueError(
            "Account creation is temporarily blocked. "
            "Please try again later."
        )

    elapsed = (
        now - otp.last_sent_at
    ).total_seconds()

    if elapsed < OTP_RESEND_COOLDOWN_SECONDS:

        remaining = int(
            OTP_RESEND_COOLDOWN_SECONDS - elapsed
        )

        raise ValueError(
            f"Please wait {remaining} seconds "
            "before requesting another OTP."
        )

    if otp.resend_count >= MAX_RESENDS:
        raise ValueError(
            "Maximum OTP resend limit reached."
        )

    code = generate_otp()

    otp.code_hash = hash_otp(code)

    otp.expires_at = (
        now
        + timedelta(
            minutes=OTP_EXPIRY_MINUTES
        )
    )

    otp.last_sent_at = now
    otp.resend_count += 1
    otp.attempts = 0
    otp.is_used = False

    if otp.resend_count >= MAX_RESENDS:
        otp.blocked_until = (
            now
            + timedelta(hours=12)
        )

    otp.save(
        update_fields=[
            "code_hash",
            "expires_at",
            "last_sent_at",
            "resend_count",
            "attempts",
            "is_used",
            "blocked_until",
            "updated_at",
        ]
    )

    send_otp_email(
        email=email,
        code=code,
        purpose=purpose,
    )

    return otp


# ============================================================
# VERIFY OTP
# ============================================================

def verify_otp(
    email,
    code,
    purpose="registration",
):

    email = email.strip().lower()
    now = timezone.now()

    try:
        otp = OTP.objects.get(
            email=email,
            purpose=purpose,
        )

    except OTP.DoesNotExist:
        raise ValueError(
            "Invalid OTP request."
        )

    if (
        otp.blocked_until
        and now < otp.blocked_until
    ):
        raise ValueError(
            "Account creation is blocked for 12 hours."
        )

    if otp.is_used:
        raise ValueError(
            "This OTP has already been used."
        )

    if otp.is_expired:
        raise ValueError(
            "This OTP has expired. "
            "Please request a new OTP."
        )

    if otp.attempts >= MAX_ATTEMPTS:
        raise ValueError(
            "Maximum OTP verification attempts reached."
        )

    otp.attempts += 1

    if not verify_otp_hash(
        code,
        otp.code_hash,
    ):

        # Persist the incremented attempts count.
        otp.save(
            update_fields=[
                "attempts",
                "updated_at",
            ]
        )

        remaining = (
            MAX_ATTEMPTS - otp.attempts
        )

        if remaining > 0:
            raise ValueError(
                f"Invalid OTP. "
                f"{remaining} attempts remaining."
            )

        # If we've exhausted attempts, lock the account creation for 12 hours.
        otp.blocked_until = (
            now + timedelta(hours=12)
        )

        otp.save(
            update_fields=[
                "attempts",
                "updated_at",
                "blocked_until",
            ]
        )

        raise ValueError(
            "Maximum OTP verification attempts reached."
        )

    otp.is_used = True

    otp.save(
        update_fields=[
            "attempts",
            "is_used",
            "updated_at",
        ]
    )

    return otp


# ============================================================
# CREATE REGISTRATION SESSION
# ============================================================

@transaction.atomic
def create_registration_session(email):

    email = email.strip().lower()

    if User.objects.filter(email=email).exists():
        raise ValueError(
            "An account with this email already exists."
        )

    registration_token = (
        generate_registration_token()
    )

    token_hash = hash_registration_token(
        registration_token
    )

    expires_at = (
        timezone.now()
        + timedelta(
            minutes=REGISTRATION_SESSION_MINUTES
        )
    )

    RegistrationSession.objects.filter(
        email=email,
        is_used=False,
    ).update(
        is_used=True,
    )

    session = RegistrationSession.objects.create(
        email=email,
        token_hash=token_hash,
        expires_at=expires_at,
        is_used=False,
    )

    return session, registration_token


# ============================================================
# COMPLETE REGISTRATION
# ============================================================

@transaction.atomic
def complete_registration(
    username,
    password,
    registration_token,
):

    sessions = (
        RegistrationSession.objects
        .select_for_update()
        .filter(
            is_used=False,
        )
        .order_by("-created_at")
    )

    session = None

    for candidate in sessions:

        if candidate.is_expired:
            continue

        if verify_registration_token(
            registration_token,
            candidate.token_hash,
        ):
            session = candidate
            break

    if session is None:
        raise ValueError(
            "Invalid or expired registration token."
        )

    if session.is_expired:
        raise ValueError(
            "Registration session has expired."
        )

    if session.is_used:
        raise ValueError(
            "This registration token has already been used."
        )

    email = session.email

    if User.objects.filter(email=email).exists():
        raise ValueError(
            "An account with this email already exists."
        )

    if User.objects.filter(username=username).exists():
        raise ValueError(
            "This username is already taken."
        )

    # Role is intentionally NOT assigned here.
    user = User.objects.create_user(
        email=email,
        username=username,
        password=password,
        role=None,
        is_active=True,
        is_verified=True,
    )

    session.is_used = True

    session.save(
        update_fields=[
            "is_used",
            "updated_at",
        ]
    )

    return user


# ============================================================
# ASSIGN USER ROLE
# ============================================================

@transaction.atomic
def assign_user_role(user, role):

    if role == UserRole.ADMIN:
        raise ValueError(
            "Admin role cannot be selected by users."
        )

    user = (
        User.objects
        .select_for_update()
        .get(pk=user.pk)
    )

    if user.role is not None:
        raise ValueError(
            "Role has already been selected."
        )

    if role not in (
        UserRole.TRAINEE,
        UserRole.TRAINER,
        UserRole.COMPANY,
    ):
        raise ValueError(
            "Invalid role."
        )

    user.role = role

    user.save(
        update_fields=[
            "role",
            "updated_at",
        ]
    )

    return user