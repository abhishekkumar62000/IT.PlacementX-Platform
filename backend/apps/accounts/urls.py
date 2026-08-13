from django.urls import path

from .views import (
    LoginView,
    LogoutView,
    MeView,
    ResendOTPView,
    SendOTPView,
    SignupView,
    VerifyOTPView,
)
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
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

    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),
    path(
        "me/",
        MeView.as_view(),
        name="me",
    ),
    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    path(
    "logout/", 
    LogoutView.as_view(), 
    name="logout"
    ),
]
