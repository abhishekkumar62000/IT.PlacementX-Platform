from datetime import timedelta
import secrets

from django.contrib.auth.hashers import check_password, make_password
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone

from .models import OTP, RegistrationSession, User


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
    """
    Generate a cryptographically secure 6-digit OTP.
    """

    return f"{secrets.randbelow(1_000_000):06d}"


def hash_otp(code):
    """
    Hash OTP before storing it in the database.
    """

    return make_password(code)


def verify_otp_hash(code, code_hash):
    """
    Verify a plaintext OTP against its stored hash.
    """

    return check_password(code, code_hash)


# ============================================================
# REGISTRATION TOKEN HELPERS
# ============================================================

def generate_registration_token():
    """
    Generate a cryptographically secure registration token.
    """

    return secrets.token_urlsafe(48)


def hash_registration_token(token):
    """
    Hash registration token before storing it.
    """

    return make_password(token)


def verify_registration_token(token, token_hash):
    """
    Verify a registration token against its stored hash.
    """

    return check_password(token, token_hash)


# ============================================================
# EMAIL
# ============================================================

def send_otp_email(email, code, purpose):
    """
    Send OTP verification email.
    """

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
    """
    Create and send a new OTP.

    Used for the initial OTP request.
    """

    email = email.strip().lower()

    now = timezone.now()

    # --------------------------------------------------------
    # Existing user check
    # --------------------------------------------------------

    if User.objects.filter(email=email).exists():
        raise ValueError(
            "An account with this email already exists."
        )

    # --------------------------------------------------------
    # Generate OTP
    # --------------------------------------------------------

    code = generate_otp()

    # --------------------------------------------------------
    # Create/update OTP
    # --------------------------------------------------------

    otp, created = OTP.objects.update_or_create(
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

    # --------------------------------------------------------
    # Send email
    # --------------------------------------------------------

    send_otp_email(
        email=email,
        code=code,
        purpose=purpose,
    )

    return otp


# ============================================================
# RESEND OTP
# ============================================================

@transaction.atomic
def resend_otp(email, purpose="registration"):
    """
    Resend an OTP while respecting:

    - 30 second cooldown
    - maximum 3 resends
    - 12 hour lockout
    """

    email = email.strip().lower()

    now = timezone.now()

    # --------------------------------------------------------
    # Lock OTP row
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Existing user check
    # --------------------------------------------------------

    if User.objects.filter(email=email).exists():
        raise ValueError(
            "An account with this email already exists."
        )

    # --------------------------------------------------------
    # Check account creation lockout
    # --------------------------------------------------------

    if (
        otp.blocked_until
        and now < otp.blocked_until
    ):
        remaining = (
            otp.blocked_until - now
        )

        hours = max(
            1,
            int(
                remaining.total_seconds()
                // 3600
            ),
        )

        raise ValueError(
            f"Account creation is temporarily blocked. "
            f"Please try again later."
        )

    # --------------------------------------------------------
    # Check resend cooldown
    # --------------------------------------------------------

    elapsed = (
        now - otp.last_sent_at
    ).total_seconds()

    if elapsed < OTP_RESEND_COOLDOWN_SECONDS:

        remaining = int(
            OTP_RESEND_COOLDOWN_SECONDS
            - elapsed
        )

        raise ValueError(
            f"Please wait {remaining} seconds "
            "before requesting another OTP."
        )

    # --------------------------------------------------------
    # Check maximum resends
    # --------------------------------------------------------

    if otp.resend_count >= MAX_RESENDS:

        raise ValueError(
            "Maximum OTP resend limit reached."
        )

    # --------------------------------------------------------
    # Generate new OTP
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Lock account creation after 3rd resend
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Send email
    # --------------------------------------------------------

    send_otp_email(
        email=email,
        code=code,
        purpose=purpose,
    )

    return otp


# ============================================================
# VERIFY OTP
# ============================================================

@transaction.atomic
def verify_otp(
    email,
    code,
    purpose="registration",
):
    """
    Verify OTP securely.

    Maximum verification attempts:
        5

    OTP lifetime:
        3 minutes
    """

    email = email.strip().lower()

    now = timezone.now()

    # --------------------------------------------------------
    # Lock OTP row
    # --------------------------------------------------------

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
            "Invalid OTP request."
        )

    # --------------------------------------------------------
    # Check lockout
    # --------------------------------------------------------

    if (
        otp.blocked_until
        and now < otp.blocked_until
    ):
        raise ValueError(
            "Account creation is blocked for 12 hours."
        )

    # --------------------------------------------------------
    # Check already used
    # --------------------------------------------------------

    if otp.is_used:

        raise ValueError(
            "This OTP has already been used."
        )

    # --------------------------------------------------------
    # Check expiry
    # --------------------------------------------------------

    if otp.is_expired:

        raise ValueError(
            "This OTP has expired. "
            "Please request a new OTP."
        )

    # --------------------------------------------------------
    # Check maximum attempts
    # --------------------------------------------------------

    if otp.attempts >= MAX_ATTEMPTS:

        raise ValueError(
            "Maximum OTP verification attempts reached."
        )

    # --------------------------------------------------------
    # Increment attempt
    # --------------------------------------------------------

    otp.attempts += 1

    # --------------------------------------------------------
    # Verify OTP
    # --------------------------------------------------------

    if not verify_otp_hash(
        code,
        otp.code_hash,
    ):

        otp.save(
            update_fields=[
                "attempts",
                "updated_at",
            ]
        )

        remaining = (
            MAX_ATTEMPTS
            - otp.attempts
        )

        if remaining > 0:
            raise ValueError(
                f"Invalid OTP. "
                f"{remaining} attempts remaining."
            )

        raise ValueError(
            "Maximum OTP verification attempts reached."
        )

    # --------------------------------------------------------
    # OTP successfully verified
    # --------------------------------------------------------

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
def create_registration_session(
    email,
    role,
):
    """
    Create a temporary registration session after
    successful OTP verification.

    The actual User account is NOT created here.
    """

    email = email.strip().lower()

    # --------------------------------------------------------
    # Prevent existing account
    # --------------------------------------------------------

    if User.objects.filter(
        email=email
    ).exists():

        raise ValueError(
            "An account with this email already exists."
        )

    # --------------------------------------------------------
    # Generate raw token
    # --------------------------------------------------------

    registration_token = (
        generate_registration_token()
    )

    # --------------------------------------------------------
    # Store hashed token
    # --------------------------------------------------------

    token_hash = (
        hash_registration_token(
            registration_token
        )
    )

    # --------------------------------------------------------
    # Session expiry
    # --------------------------------------------------------

    expires_at = (
        timezone.now()
        + timedelta(
            minutes=REGISTRATION_SESSION_MINUTES
        )
    )

    # --------------------------------------------------------
    # Invalidate previous unused sessions
    # --------------------------------------------------------

    RegistrationSession.objects.filter(
        email=email,
        is_used=False,
    ).update(
        is_used=True,
    )

    # --------------------------------------------------------
    # Create new session
    # --------------------------------------------------------

    session = RegistrationSession.objects.create(
        email=email,
        role=role,
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
    """
    Complete account creation using a verified
    registration session.
    """

    # --------------------------------------------------------
    # Find possible active sessions
    # --------------------------------------------------------

    sessions = (
        RegistrationSession.objects
        .select_for_update()
        .filter(
            is_used=False,
        )
        .order_by("-created_at")
    )

    session = None

    # --------------------------------------------------------
    # Verify token
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Check expiry again after locking
    # --------------------------------------------------------

    if session.is_expired:

        raise ValueError(
            "Registration session has expired."
        )

    # --------------------------------------------------------
    # Check token reuse
    # --------------------------------------------------------

    if session.is_used:

        raise ValueError(
            "This registration token has already been used."
        )

    # --------------------------------------------------------
    # Extract trusted registration data
    # --------------------------------------------------------

    email = session.email
    role = session.role

    # --------------------------------------------------------
    # Check email uniqueness
    # --------------------------------------------------------

    if User.objects.filter(
        email=email
    ).exists():

        raise ValueError(
            "An account with this email already exists."
        )

    # --------------------------------------------------------
    # Check username uniqueness
    # --------------------------------------------------------

    if User.objects.filter(
        username=username
    ).exists():

        raise ValueError(
            "This username is already taken."
        )

    # --------------------------------------------------------
    # Create user
    # --------------------------------------------------------

    user = User.objects.create_user(
        email=email,
        username=username,
        password=password,
        role=role,
        is_active=True,
        is_verified=True,
    )

    # --------------------------------------------------------
    # Consume registration token
    # --------------------------------------------------------

    session.is_used = True

    session.save(
        update_fields=[
            "is_used",
            "updated_at",
        ]
    )

    return user