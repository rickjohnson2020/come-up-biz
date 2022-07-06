from os import name
from django.urls import path, re_path, include
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
from .views import UserProfileView, VerifyEmailView
from django.views.generic import TemplateView
# from .views import CreateUserView, TwitterLoginView

urlpatterns = [
  # path('twitter/', TwitterLoginView.as_view(), name='twitter_login')
  # path('register/', CreateUserView.as_view(), name='registration'),
  path('<str:user>/', UserProfileView.as_view(), name='profile'),
  path('auth/', include('dj_rest_auth.urls')),
  path('dj-rest-auth/registration/account-confirm-email/<str:key>/', ConfirmEmailView.as_view(),),
  path('auth/register/', include('dj_rest_auth.registration.urls')),
  path('auth/register/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'), # added
  # re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(), name='account_confirm_email',), # added
]