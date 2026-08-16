from django.urls import path

from .views import (
    SendOTPView,
    VerifyOTPView,
    ResendOTPView,
    SignupView,
    LoginView,
    MeView,
    RoleSelectionView,
    LogoutView,
)

from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [

    # =========================
    # Registration / OTP
    # =========================

    path(
        "otp/send/",
        SendOTPView.as_view(),
        name="send-otp",
    ),

    path(
        "otp/verify/",
        VerifyOTPView.as_view(),
        name="verify-otp",
    ),

    path(
        "otp/resend/",
        ResendOTPView.as_view(),
        name="resend-otp",
    ),

    path(
        "signup/",
        SignupView.as_view(),
        name="signup",
    ),

    # =========================
    # JWT Authentication
    # =========================

    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    path(
        "me/",
        MeView.as_view(),
        name="me",
    ),
    path(
        "role/selection/",
        RoleSelectionView.as_view(),
        name="role-selection",
    ),

    path(
        "logout/",
        LogoutView.as_view(),
        name="logout",
    ),
]