from rest_framework import generics, serializers
from rest_framework.fields import SerializerMethodField

from accounts.serializers import UserSerializer
from .models import Idea, Like, Comment



class IdeaSerializer(serializers.ModelSerializer):
    # likes_count = serializers.IntegerField(read_only=True)
    likes_count = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["created_by"] = UserSerializer(instance.created_by).data
        return representation

    def get_likes_count(self, obj):
        idea_id = generics.get_object_or_404(Idea, idea_id = self.kwargs.get('idea_id'))
        obj = Like.objects.filter(like=True, idea=idea_id)
        return obj.count()

    class Meta:
        model = Idea
        fields = ('idea_id', 'title', 'image', 'likes_count', 'content', 'created_by', 'created_at', 'updated_at') # deleted 'likes_count'


class LikeSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["created_by"] = UserSerializer(instance.created_by).data
        representation["idea"] = IdeaSerializer(instance.idea).data
        return representation

    class Meta:
        model = Like
        fields = ('like_id', 'like', 'idea', 'created_by', 'created_at')


class CommentSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["created_by"] = UserSerializer(instance.created_by).data
        representation["idea"] = IdeaSerializer(instance.idea).data
        return representation

    class Meta:
        model = Comment
        fields = ('comment_id', 'comment', 'idea', 'crated_by', 'created_at', 'updated_at')
