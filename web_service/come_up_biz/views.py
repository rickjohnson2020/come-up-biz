from accounts.models import CustomUser
from django.db.models import query
from rest_framework import generics, viewsets, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Idea
from .serializers import IdeaSerializer

from django.db.models import Count, Sum, Value
from django.db.models.functions import Coalesce


class IdeaListView(generics.ListAPIView):
    """Class for public idea list view (for frontend home page)"""
    queryset = Idea.objects.all().order_by("-created_at")
    serializer_class = IdeaSerializer
    permission_classes = (AllowAny,)


class IdeaDetailView(generics.RetrieveAPIView):
    # queryset = Idea.objects.annotate(likes_count=Coalesce(Sum('Like__like'), Value(0)))
    queryset = Idea.objects.all().annotate(likes_count=Count('like'))
    serializer_class = IdeaSerializer
    permission_classes = (AllowAny,)


# class IdeaViewSet(viewsets.ModelViewSet):
#     queryset = Idea.objects.all()
#     serializer_class = IdeaSerializer
#     permission_classes = (IsAuthenticated,)


class UserIdeaListView(generics.ListAPIView):
    """Class for personal idea list view (for frontend user's profile page)"""
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer 
    permission_classes = (AllowAny,)
    # lookup_field = 'created_by'

    def get_queryset(self):
        user = generics.get_object_or_404(CustomUser, username = self.kwargs.get('username'))
        return Idea.objects.filter(created_by=user).order_by("-created_at")


# class UserIdeaDetailView(generics.RetrieveAPIView):
#     """Class for idea detail view"""
#     queryset = Idea.objects.all()
#     serializer_class = IdeaSerializer
#     permission_classes = (AllowAny,)

#     def get_queryset(self):
#         user = generics.get_object_or_404(CustomUser, username = self.kwargs.get('username'))
#         return Idea.objects.filter(created_by=user).order_by("-created_at")


class UserIdeaViewSet(viewsets.ModelViewSet):
    """Class for create, update, delete view (for frontend user's edit page)"""
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    # permission_classes = (IsAuthenticated,)

    # def get_queryset(self):
    #     user = generics.get_object_or_404(CustomUser, username = self.kwargs.get('username'))
    #     return Idea.objects.filter(created_by=user).order_by("-created_at")

# def post(self, request, format=None):
#     serializer = self.serializer_class(data=request.data)
#
#     if serializer.is_valid():
#         title = serializer.data.get('title')
#         idea = Idea(title=title)
#         idea.save()
#         return Response(IdeaSerializer(idea).data, status=status.HTTP_201_CREATED)
#
#     return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)
