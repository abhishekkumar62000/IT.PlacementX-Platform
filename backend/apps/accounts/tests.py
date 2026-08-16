from datetime import timedelta

from django.core import mail
from django.test import (
    TransactionTestCase,
    override_settings,
)
from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone

from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    OTP,
    RegistrationSession,
    User,
    UserRole,
)
from .services import (
    complete_registration,
    create_otp,
    create_registration_session,
    resend_otp,
    verify_otp,
)


# ============================================================
# OTP TESTS
# ============================================================

@override_settings(
    EMAIL_BACKEND=(
        "django.core.mail.backends.locmem.EmailBackend"
    )
)
class OTPAuthTests(TransactionTestCase):

    def test_correct_otp_verifies_successfully(self):

        otp, code = create_otp(
            "user@example.com"
        )

        verified = verify_otp(
            "user@example.com",
            code,
        )

        self.assertTrue(
            verified.is_used
        )

        self.assertEqual(
            verified.attempts,
            1,
        )

        self.assertEqual(
            len(mail.outbox),
            1,
        )

    def test_wrong_otp_is_rejected(self):

        create_otp(
            "user@example.com"
        )

        with self.assertRaises(ValueError):
            verify_otp(
                "user@example.com",
                "000000",
            )

    def test_expired_otp_is_rejected(self):

        otp, _ = create_otp(
            "user@example.com"
        )

        otp.expires_at = (
            timezone.now()
            - timedelta(minutes=1)
        )

        otp.save(
            update_fields=[
                "expires_at"
            ]
        )

        with self.assertRaises(ValueError):
            verify_otp(
                "user@example.com",
                "000000",
            )

    def test_reusing_an_otp_is_rejected(self):

        otp, code = create_otp(
            "user@example.com"
        )

        verify_otp(
            "user@example.com",
            code,
        )

        with self.assertRaises(ValueError):
            verify_otp(
                "user@example.com",
                code,
            )

    def test_five_failed_attempts_block_otp(self):

        otp, _ = create_otp(
            "user@example.com"
        )

        for _ in range(5):

            with self.assertRaises(ValueError):
                verify_otp(
                    "user@example.com",
                    "000000",
                )

        otp.refresh_from_db()

        self.assertIsNotNone(
            otp.blocked_until
        )

    def test_resend_before_30_seconds_is_rejected(self):

        create_otp(
            "user@example.com"
        )

        with self.assertRaises(ValueError):
            resend_otp(
                "user@example.com"
            )

    def test_more_than_three_resends_trigger_lockout(self):

        otp, _ = create_otp(
            "user@example.com"
        )

        for _ in range(3):

            otp.refresh_from_db()

            otp.last_sent_at = (
                timezone.now()
                - timedelta(seconds=31)
            )

            otp.save(
                update_fields=[
                    "last_sent_at"
                ]
            )

            resend_otp(
                "user@example.com"
            )

        with self.assertRaises(ValueError):
            resend_otp(
                "user@example.com"
            )

        otp.refresh_from_db()

        self.assertIsNotNone(
            otp.blocked_until
        )


# ============================================================
# REGISTRATION TESTS
# ============================================================

@override_settings(
    EMAIL_BACKEND=(
        "django.core.mail.backends.locmem.EmailBackend"
    )
)
class RegistrationTests(TransactionTestCase):

    def test_registration_session_does_not_require_role(self):

        session, raw_token = (
            create_registration_session(
                email="new@example.com"
            )
        )

        self.assertEqual(
            session.email,
            "new@example.com",
        )

        self.assertTrue(
            raw_token
        )

    def test_signup_creates_user_without_role(self):

        _, raw_token = (
            create_registration_session(
                email="new@example.com"
            )
        )

        user = complete_registration(
            username="newuser",
            password="StrongPass123",
            registration_token=raw_token,
        )

        self.assertEqual(
            user.email,
            "new@example.com",
        )

        self.assertIsNone(
            user.role
        )

        self.assertTrue(
            user.is_verified
        )

    def test_registration_token_can_only_be_used_once(self):

        _, raw_token = (
            create_registration_session(
                email="new@example.com"
            )
        )

        complete_registration(
            username="newuser",
            password="StrongPass123",
            registration_token=raw_token,
        )

        with self.assertRaises(ValueError):
            complete_registration(
                username="anotheruser",
                password="StrongPass123",
                registration_token=raw_token,
            )


# ============================================================
# API AUTHENTICATION TESTS
# ============================================================

class LoginTest(APITestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            email="test@example.com",
            username="test",
            password="Test@123",
        )

    # --------------------------------------------------------
    # LOGIN
    # --------------------------------------------------------

    def test_login(self):

        response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            200,
        )

        self.assertIn(
            "tokens",
            response.data,
        )

        self.assertIn(
            "access",
            response.data["tokens"],
        )

        self.assertIn(
            "refresh",
            response.data["tokens"],
        )

        self.assertEqual(
            response.data["user"]["email"],
            "test@example.com",
        )

    # --------------------------------------------------------
    # /ME/
    # --------------------------------------------------------

    def test_me_requires_authentication(self):

        response = self.client.get(
            reverse("me")
        )

        self.assertEqual(
            response.status_code,
            401,
        )

    def test_me_returns_authenticated_user(self):

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        access = (
            login_response
            .data["tokens"]["access"]
        )

        self.client.credentials(
            HTTP_AUTHORIZATION=(
                f"Bearer {access}"
            )
        )

        response = self.client.get(
            reverse("me")
        )

        self.assertEqual(
            response.status_code,
            200,
        )

        self.assertEqual(
            response.data["email"],
            "test@example.com",
        )

    # --------------------------------------------------------
    # ROLE
    # --------------------------------------------------------

    def test_role_can_be_selected_after_signup(self):

        self.assertIsNone(
            self.user.role
        )

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        access = (
            login_response
            .data["tokens"]["access"]
        )

        self.client.credentials(
            HTTP_AUTHORIZATION=(
                f"Bearer {access}"
            )
        )

        response = self.client.post(
            reverse("role-selection"),
            {
                "role": "trainee",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            200,
        )

        self.user.refresh_from_db()

        self.assertEqual(
            self.user.role,
            UserRole.TRAINEE,
        )

    def test_admin_role_cannot_be_selected(self):

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        access = (
            login_response
            .data["tokens"]["access"]
        )

        self.client.credentials(
            HTTP_AUTHORIZATION=(
                f"Bearer {access}"
            )
        )

        response = self.client.post(
            reverse("role-selection"),
            {
                "role": "admin",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            400,
        )

    def test_role_cannot_be_changed_after_selection(self):

        self.user.role = UserRole.TRAINEE

        self.user.save(
            update_fields=[
                "role"
            ]
        )

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        access = (
            login_response
            .data["tokens"]["access"]
        )

        self.client.credentials(
            HTTP_AUTHORIZATION=(
                f"Bearer {access}"
            )
        )

        response = self.client.post(
            reverse("role-selection"),
            {
                "role": "trainer",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            400,
        )

    # --------------------------------------------------------
    # REFRESH TOKEN
    # --------------------------------------------------------

    def test_refresh_token_returns_new_access_token(self):

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        self.assertEqual(
            login_response.status_code,
            200,
        )

        refresh_token = (
            login_response
            .data["tokens"]["refresh"]
        )

        response = self.client.post(
            reverse("token_refresh"),
            {
                "refresh": refresh_token,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            200,
        )

        self.assertIn(
            "access",
            response.data,
        )

    # --------------------------------------------------------
    # LOGOUT
    # --------------------------------------------------------

    def test_logout(self):

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        refresh = (
            login_response
            .data["tokens"]["refresh"]
        )

        access = (
            login_response
            .data["tokens"]["access"]
        )

        logout_response = self.client.post(
            reverse("logout"),
            {
                "refresh": refresh
            },
            format="json",
            HTTP_AUTHORIZATION=(
                f"Bearer {access}"
            ),
        )

        self.assertEqual(
            logout_response.status_code,
            200,
        )

        self.assertEqual(
            logout_response.data["message"],
            "Logged out successfully",
        )

    # --------------------------------------------------------
    # BLACKLIST
    # --------------------------------------------------------

    def test_logout_blacklists_refresh_token(self):

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        access_token = (
            login_response
            .data["tokens"]["access"]
        )

        refresh_token = (
            login_response
            .data["tokens"]["refresh"]
        )

        self.client.credentials(
            HTTP_AUTHORIZATION=(
                f"Bearer {access_token}"
            )
        )

        logout_response = self.client.post(
            reverse("logout"),
            {
                "refresh": refresh_token
            },
            format="json",
        )

        self.assertEqual(
            logout_response.status_code,
            200,
        )

        refresh_response = self.client.post(
            reverse("token_refresh"),
            {
                "refresh": refresh_token,
            },
            format="json",
        )

        self.assertEqual(
            refresh_response.status_code,
            401,
        )

    # --------------------------------------------------------
    # ROTATION + LOGOUT IDEMPOTENCY
    # --------------------------------------------------------

    def test_logout_after_refresh_rotation_is_idempotent(self):

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        self.assertEqual(
            login_response.status_code,
            200,
        )

        old_refresh = (
            login_response
            .data["tokens"]["refresh"]
        )

        access = (
            login_response
            .data["tokens"]["access"]
        )

        refresh_response = self.client.post(
            reverse("token_refresh"),
            {
                "refresh": old_refresh,
            },
            format="json",
        )

        self.assertEqual(
            refresh_response.status_code,
            200,
        )

        logout_response = self.client.post(
            reverse("logout"),
            {
                "refresh": old_refresh
            },
            format="json",
            HTTP_AUTHORIZATION=(
                f"Bearer {access}"
            ),
        )

        self.assertEqual(
            logout_response.status_code,
            200,
        )

        self.assertEqual(
            logout_response.data["message"],
            "Logged out successfully",
        )