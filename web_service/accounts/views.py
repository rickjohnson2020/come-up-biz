from accounts.models import UserProfile
from accounts.serializers import UserSerializer, ProfileSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, GenericAPIView, ListAPIView

from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth.client import OAuthClient
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from rest_framework.permissions import AllowAny
from dj_rest_auth.registration.views import VerifyEmailView # added

class CreateUserView(CreateAPIView):
	# model = get_user_model()
	permission_classes = (AllowAny,)
	serializer_class = UserSerializer

# added
class VerifyEmailView(VerifyEmailView):
	permission_classes = (AllowAny,)


class UserProfileView(RetrieveAPIView):
	queryset = UserProfile.objects.all()
	# model = UserProfile
	serializer_class = ProfileSerializer
	permission_classes = (AllowAny,)
	lookup_field = 'user'

# class TwitterLoginView(SocialLoginView):
#     adapter_class = TwitterOAuthAdapter
#     client_class = OAuthClient
#     serializer_class = TwitterLoginSerializer