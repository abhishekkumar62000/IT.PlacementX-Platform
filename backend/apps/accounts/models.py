from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone


# ============================================================
# USER ROLES
# ============================================================

class UserRole(models.TextChoices):
    TRAINEE = "trainee", "Trainee"
    TRAINER = "trainer", "Trainer"
    COMPANY = "company", "Company"
    ADMIN = "admin", "Admin"


# ============================================================
# USER MANAGER
# ============================================================

class UserManager(BaseUserManager):

    def create_user(
        self,
        email,
        username,
        password=None,
        role=None,
        **extra_fields,
    ):
        if not email:
            raise ValueError("Email is required.")

        if not username:
            raise ValueError("Username is required.")

        if not password:
            raise ValueError("Password is required.")

        if not role:
            raise ValueError("Role is required.")

        email = self.normalize_email(email).strip().lower()
        username = username.strip()

        user = self.model(
            email=email,
            username=username,
            role=role,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
        self,
        email,
        username,
        password=None,
        **extra_fields,
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_verified", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(
            email=email,
            username=username,
            password=password,
            role=UserRole.ADMIN,
            **extra_fields,
        )


# ============================================================
# USER
# ============================================================

class User(
    AbstractBaseUser,
    PermissionsMixin,
):

    email = models.EmailField(
        unique=True,
        db_index=True,
    )

    username = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
    )

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
    )

    is_active = models.BooleanField(
        default=True,
    )

    is_verified = models.BooleanField(
        default=False,
    )

    is_staff = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.username} ({self.role})"


# ============================================================
# OTP
# ============================================================

class OTP(models.Model):

    email = models.EmailField(
        db_index=True,
    )

    code_hash = models.CharField(
        max_length=128,
    )

    purpose = models.CharField(
        max_length=30,
        default="registration",
    )

    expires_at = models.DateTimeField()

    is_used = models.BooleanField(
        default=False,
    )

    attempts = models.PositiveIntegerField(
        default=0,
    )

    resend_count = models.PositiveIntegerField(
        default=0,
    )

    last_sent_at = models.DateTimeField()

    blocked_until = models.DateTimeField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "email",
                    "purpose",
                ],
                name="unique_otp_email_purpose",
            ),
        ]

        indexes = [
            models.Index(
                fields=[
                    "email",
                    "purpose",
                    "is_used",
                ]
            ),
            models.Index(
                fields=[
                    "expires_at",
                ]
            ),
        ]

    @property
    def is_expired(self):
        return timezone.now() >= self.expires_at

    def __str__(self):
        return f"{self.email} - {self.purpose}"


# ============================================================
# REGISTRATION SESSION
# ============================================================

class RegistrationSession(models.Model):
    """
    Temporary state between successful OTP verification
    and final account creation.
    """

    email = models.EmailField(
        db_index=True,
    )

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
    )

    token_hash = models.CharField(
        max_length=128,
        unique=True,
    )

    expires_at = models.DateTimeField()

    is_used = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        indexes = [
            models.Index(
                fields=[
                    "email",
                    "is_used",
                ]
            ),
            models.Index(
                fields=[
                    "expires_at",
                ]
            ),
        ]

    @property
    def is_expired(self):
        return timezone.now() >= self.expires_at

    def __str__(self):
        return self.email