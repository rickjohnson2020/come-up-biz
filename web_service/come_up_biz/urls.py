from os import name
from django import urls
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from django.views.generic import TemplateView
from come_up_biz.views import IdeaListView, IdeaDetailView, UserIdeaViewSet, UserIdeaListView


router = routers.DefaultRouter()
router.register('ideas', UserIdeaViewSet, basename='ideas')

app_name = 'come_up_biz'
urlpatterns = [
    path('idea/', IdeaListView.as_view(), name="idea-list"),
    path('idea/<str:pk>/', IdeaDetailView.as_view(), name='idea-detail'),
    path('', include(router.urls)),
    path('<str:username>/', UserIdeaListView.as_view(), name='user-ideas'), # added
    # path('<str:username>/<str:pk>/', UserIdeaDetailView.as_view(), name='idea-detail'), # added
]
