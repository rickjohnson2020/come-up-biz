from django.db.models.base import Model
from rest_framework import fields
from rest_framework.serializers import ModelSerializer
from .models import CustomUser, UserProfile


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"]
        )

        return user


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('user', 'image', 'bio', 'twitter',)
