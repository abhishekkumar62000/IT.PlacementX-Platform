from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    LoginSerializer,
    LogoutSerializer,
    ResendOTPSerializer,
    SendOTPSerializer,
    SignupSerializer,
    VerifyOTPSerializer,
)


# ============================================================
# SEND OTP
# ============================================================

class SendOTPView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = SendOTPSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            {
                "success": True,
                "message": (
                    "OTP sent successfully. "
                    "Please check your email."
                ),
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# VERIFY OTP
# ============================================================

class VerifyOTPView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = VerifyOTPSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            {
                "success": True,
                "message": (
                    "OTP verified successfully."
                ),
                "data": {
                    "registration_token":
                    serializer.validated_data[
                        "registration_token"
                    ],
                },
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# RESEND OTP
# ============================================================

class ResendOTPView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = ResendOTPSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            {
                "success": True,
                "message": (
                    "OTP resent successfully. "
                    "Please check your email."
                ),
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# SIGNUP
# ============================================================

class SignupView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = SignupSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        return Response(
            {
                "success": True,
                "message": (
                    "Account created successfully."
                ),
                "data": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "role": user.role,
                },
            },
            status=status.HTTP_201_CREATED,
        )


# ============================================================
# LOGIN
# ============================================================

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .serializers import LoginSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        return Response(
            {
                "message": "Login successful.",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "role": user.role,
                },
                "tokens": {
                    "access": serializer.validated_data["access"],
                    "refresh": serializer.validated_data["refresh"],
                },
            },
            status=status.HTTP_200_OK,
        )

    
from rest_framework.permissions import IsAuthenticated


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "role": user.role,
        })

from rest_framework.permissions import IsAuthenticated

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "Logged out successfully"},
            status=status.HTTP_200_OK,
        )