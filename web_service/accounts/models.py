from os import truncate
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from uuid import uuid4
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('メールアドレスは必須です')

        email = self.normalize_email(email)
        user = self.model(username=username, email=email)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(username, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        max_length=255, default=uuid4, editable=False, primary_key=True)
    username = models.CharField('ユーザー名', max_length=255, unique=True)
    email = models.EmailField('メールアドレス', unique=True)
    date_joined = models.DateTimeField('入会日', default=timezone.now)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    # class Meta:
    #     unique_together = (("id", "username"),)

    def __str__(self):
        return self.email


class UserProfile(models.Model):
  user = models.OneToOneField(CustomUser, to_field='username', on_delete=models.CASCADE)
  image = models.ImageField(default="default.jpg", upload_to="profile_pics")
  bio = models.TextField(null=True, blank = True)
  twitter = models.URLField(max_length=255, null=True, blank=True)

  def __str__(self):
    return f"{self.user.username} Profile"