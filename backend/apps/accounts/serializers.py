from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User, UserRole
from .services import (
    complete_registration,
    create_otp,
    create_registration_session,
    resend_otp,
    verify_otp,
)


# ============================================================
# SEND OTP
# ============================================================

class SendOTPSerializer(serializers.Serializer):

    email = serializers.EmailField()

    role = serializers.ChoiceField(
        choices=UserRole.choices
    )

    def validate_email(self, value):
        return value.strip().lower()

    def validate_role(self, value):

        if value == UserRole.ADMIN:
            raise serializers.ValidationError(
                "Admin accounts cannot be self-created."
            )

        return value

    def validate(self, attrs):

        email = attrs["email"]

        if User.objects.filter(
            email=email
        ).exists():

            raise serializers.ValidationError(
                {
                    "email": (
                        "An account with this email "
                        "already exists."
                    )
                }
            )

        try:
            create_otp(
                email=email,
                purpose="registration",
            )

        except ValueError as error:

            raise serializers.ValidationError(
                {
                    "email": str(error)
                }
            ) from error

        return attrs


# ============================================================
# VERIFY OTP
# ============================================================

class VerifyOTPSerializer(serializers.Serializer):

    email = serializers.EmailField()

    code = serializers.RegexField(
        regex=r"^\d{6}$",
        error_messages={
            "invalid": (
                "OTP must contain exactly 6 digits."
            )
        },
    )

    role = serializers.ChoiceField(
        choices=UserRole.choices
    )

    def validate_email(self, value):
        return value.strip().lower()

    def validate_role(self, value):

        if value == UserRole.ADMIN:
            raise serializers.ValidationError(
                "Admin accounts cannot be self-created."
            )

        return value

    def validate(self, attrs):

        email = attrs["email"]

        try:
            verify_otp(
                email=email,
                code=attrs["code"],
                purpose="registration",
            )

            _, registration_token = (
                create_registration_session(
                    email=email,
                    role=attrs["role"],
                )
            )

        except ValueError as error:

            raise serializers.ValidationError(
                {
                    "code": str(error)
                }
            ) from error

        attrs["registration_token"] = registration_token

        return attrs


# ============================================================
# RESEND OTP
# ============================================================

class ResendOTPSerializer(serializers.Serializer):

    email = serializers.EmailField()

    def validate_email(self, value):

        value = value.strip().lower()

        try:
            resend_otp(
                email=value,
                purpose="registration",
            )

        except ValueError as error:

            raise serializers.ValidationError(
                {
                    "email": str(error)
                }
            ) from error

        return value


# ============================================================
# COMPLETE REGISTRATION
# ============================================================

class SignupSerializer(
    serializers.ModelSerializer
):

    password = serializers.CharField(
        write_only=True,
        min_length=8,
        trim_whitespace=False,
    )

    password_confirm = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    registration_token = serializers.CharField(
        write_only=True,
    )

    class Meta:
        model = User

        fields = [
            "username",
            "password",
            "password_confirm",
            "registration_token",
        ]

    def validate_username(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Username cannot be empty."
            )

        if User.objects.filter(
            username=value
        ).exists():

            raise serializers.ValidationError(
                "This username is already taken."
            )

        return value

    def validate(self, attrs):

        if (
            attrs["password"]
            != attrs["password_confirm"]
        ):
            raise serializers.ValidationError(
                {
                    "password_confirm": (
                        "Passwords do not match."
                    )
                }
            )

        return attrs

    def create(self, validated_data):

        password = validated_data.pop(
            "password"
        )

        validated_data.pop(
            "password_confirm"
        )

        registration_token = (
            validated_data.pop(
                "registration_token"
            )
        )

        try:

            user = complete_registration(
                username=validated_data["username"],
                password=password,
                registration_token=registration_token,
            )

        except ValueError as error:

            raise serializers.ValidationError(
                {
                    "registration_token": str(error)
                }
            ) from error

        return user


# ============================================================
# LOGIN
# ============================================================

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs["email"]
        password = attrs["password"]

        user = authenticate(
            request=self.context.get("request"),
            username=email,
            password=password,
        )

        if user is None:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "User account is inactive."
            )

        refresh = RefreshToken.for_user(user)

        return {
            "user": user,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }



from rest_framework_simplejwt.tokens import RefreshToken


from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.validated_data["refresh"])
            token.blacklist()
        except TokenError:
            # Token is already invalid/blacklisted.
            # Logout remains idempotent.
            pass