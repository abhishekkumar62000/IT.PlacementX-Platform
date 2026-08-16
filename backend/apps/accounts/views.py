from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    OpenApiResponse,
)
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    LoginSerializer,
    LogoutSerializer,
    ResendOTPSerializer,
    RoleSelectionSerializer,
    SendOTPSerializer,
    SignupSerializer,
    VerifyOTPSerializer,
)


# ============================================================
# SEND OTP
# ============================================================

@extend_schema(
    tags=["Authentication"],
    request=SendOTPSerializer,
    auth=[],
    responses={
        200: OpenApiResponse(
            description="OTP sent successfully."
        ),
        400: OpenApiResponse(
            description="Invalid request."
        ),
    },
)
class SendOTPView(APIView):

    permission_classes = [AllowAny]

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

@extend_schema(
    tags=["Authentication"],
    request=VerifyOTPSerializer,
    auth=[],
    responses={
        200: OpenApiResponse(
            description="OTP verified successfully."
        ),
        400: OpenApiResponse(
            description="Invalid or expired OTP."
        ),
    },
)
class VerifyOTPView(APIView):

    permission_classes = [AllowAny]

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

@extend_schema(
    tags=["Authentication"],
    request=ResendOTPSerializer,
    auth=[],
    responses={
        200: OpenApiResponse(
            description="OTP resent successfully."
        ),
        400: OpenApiResponse(
            description="OTP resend request rejected."
        ),
    },
)
class ResendOTPView(APIView):

    permission_classes = [AllowAny]

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

@extend_schema(
    tags=["Authentication"],
    request=SignupSerializer,
    auth=[],
    responses={
        201: OpenApiResponse(
            description="Account created successfully."
        ),
        400: OpenApiResponse(
            description="Invalid registration data."
        ),
    },
)
class SignupView(APIView):

    permission_classes = [AllowAny]

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

@extend_schema(
    tags=["Authentication"],
    request=LoginSerializer,
    auth=[],
    responses={
        200: OpenApiResponse(
            description="Login successful."
        ),
        400: OpenApiResponse(
            description="Invalid credentials."
        ),
    },
)
class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data,
            context={
                "request": request
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

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
                    "access":
                        serializer.validated_data[
                            "access"
                        ],
                    "refresh":
                        serializer.validated_data[
                            "refresh"
                        ],
                },
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# ME
# ============================================================

@extend_schema(
    tags=["Authentication"],
    responses={
        200: OpenApiResponse(
            description="Current authenticated user."
        ),
        401: OpenApiResponse(
            description="Authentication required."
        ),
    },
)
class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response(
            {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "role": user.role,
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# ROLE SELECTION
# ============================================================

@extend_schema(
    tags=["Profile / Onboarding"],
    request=RoleSelectionSerializer,
    responses={
        200: OpenApiResponse(
            description="Role selected successfully."
        ),
        400: OpenApiResponse(
            description="Invalid role or role already selected."
        ),
        401: OpenApiResponse(
            description="Authentication required."
        ),
    },
    examples=[
        OpenApiExample(
            "Trainee",
            value={
                "role": "trainee"
            },
            request_only=True,
        ),
        OpenApiExample(
            "Trainer",
            value={
                "role": "trainer"
            },
            request_only=True,
        ),
        OpenApiExample(
            "Company",
            value={
                "role": "company"
            },
            request_only=True,
        ),
    ],
)
class RoleSelectionView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = RoleSelectionSerializer(
            data=request.data,
            context={
                "request": request
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        return Response(
            {
                "success": True,
                "message": "Role selected successfully.",
                "data": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "role": user.role,
                },
            },
            status=status.HTTP_200_OK,
        )


# ============================================================
# LOGOUT
# ============================================================

@extend_schema(
    tags=["Authentication"],
    request=LogoutSerializer,
    responses={
        200: OpenApiResponse(
            description="Logged out successfully."
        ),
        400: OpenApiResponse(
            description="Invalid refresh token."
        ),
        401: OpenApiResponse(
            description="Authentication required."
        ),
    },
)
class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = LogoutSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            {
                "message": "Logged out successfully"
            },
            status=status.HTTP_200_OK,
        )