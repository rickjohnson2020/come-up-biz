from django.db import models
from accounts.models import CustomUser



# class Category(models.Model):
#     category_id = models.BigAutoField(primary_key=True)
#     category = models.CharField(max_length=255, unique=True)

#     def __str__(self):
#         return self.category


class Idea(models.Model):
    idea_id = models.BigAutoField(primary_key=True)
    title = models.CharField(verbose_name='タイトル', max_length=40)
    image = models.ImageField(upload_to='images', verbose_name='イメージ画像', blank=True, null=True)
    content = models.TextField(verbose_name='本文', blank=True, null=True)
    # category = models.ForeignKey(Category, verbose_name='カテゴリー', to_field='category_id', on_delete=models.DO_NOTHING, blank=True, null='True')
    # likes = models.ManyToManyField(CustomUser, verbose_name='いいね', related_name='idea_likes') # Deleted 'on_delete=models.SET_NULL'
    # likes_count = models.IntegerField(default=0, null=False, blank=False, editable=False)
    # comments_count = models.IntegerField(default=0, null=False, blank=False, editable=False)
    created_by = models.ForeignKey(CustomUser, verbose_name='投稿者', on_delete=models.RESTRICT) # If no Idea object, user will be deleted
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    # class Meta:
    #     verbose_name_plural = 'Idea'

    # def number_of_likes(self):
    #     return self.likes.count()

    def __str__(self):
        return self.title


class Like(models.Model):
    like_id = models.BigAutoField(primary_key=True)
    like = models.BooleanField(default=False)
    idea = models.ForeignKey(Idea, to_field='idea_id', on_delete=models.CASCADE)
    created_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.idea.title


class Comment(models.Model):
    comment_id = models.BigAutoField(primary_key=True)
    comment = models.TextField()
    created_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # defines a many-to-one relationship
    # one article has many comments
    idea = models.ForeignKey(Idea, to_field='idea_id', on_delete=models.CASCADE)


    def __str__(self):
        return self.comment[:20]