from rest_framework.test import APITestCase
from django.urls import reverse
from apps.accounts.models import User


class LoginTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            username="test",
            password="Test@123",
            role="trainee",
        )

    def test_login(self):
        response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)

        self.assertIn("tokens", response.data)
        self.assertIn("access", response.data["tokens"])
        self.assertIn("refresh", response.data["tokens"])

        self.assertEqual(
            response.data["user"]["email"],
            "test@example.com",
        )

    def test_logout(self):
        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        self.assertEqual(login_response.status_code, 200)
        refresh = login_response.data["tokens"]["refresh"]
        access = login_response.data["tokens"]["access"]

        logout_response = self.client.post(
            reverse("logout"),
            {"refresh": refresh},
            format="json",
            HTTP_AUTHORIZATION=f"Bearer {access}",
        )

        self.assertEqual(logout_response.status_code, 200)
        self.assertEqual(logout_response.data["message"], "Logged out successfully")

    def test_logout_after_refresh_rotation_is_idempotent(self):
        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        self.assertEqual(login_response.status_code, 200)
        old_refresh = login_response.data["tokens"]["refresh"]
        access = login_response.data["tokens"]["access"]

        refresh_response = self.client.post(
            reverse("token_refresh"),
            {"refresh": old_refresh},
            format="json",
        )

        self.assertEqual(refresh_response.status_code, 200)

        logout_response = self.client.post(
            reverse("logout"),
            {"refresh": old_refresh},
            format="json",
            HTTP_AUTHORIZATION=f"Bearer {access}",
        )

        self.assertEqual(logout_response.status_code, 200)
        self.assertEqual(logout_response.data["message"], "Logged out successfully")

    def test_refresh_token_returns_new_access_token(self):
        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        self.assertEqual(login_response.status_code, 200)

        refresh_token = login_response.data["tokens"]["refresh"]

        response = self.client.post(
            reverse("token_refresh"),
            {
                "refresh": refresh_token,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
    def test_logout_blacklists_refresh_token(self):
        login_response = self.client.post(
            reverse("login"),
            {
                "email": "test@example.com",
                "password": "Test@123",
            },
            format="json",
        )

        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.data["tokens"]["access"]
        refresh_token = login_response.data["tokens"]["refresh"]

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {access_token}"
        )

        logout_response = self.client.post(
            reverse("logout"),
            {
                "refresh": refresh_token,
            },
            format="json",
        )

        self.assertEqual(logout_response.status_code, 200)

        refresh_response = self.client.post(
            reverse("token_refresh"),
            {
                "refresh": refresh_token,
            },
            format="json",
        )

        self.assertEqual(refresh_response.status_code, 401)