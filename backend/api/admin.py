from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at')  # Customize fields displayed in the admin list view
    search_fields = ('title', 'content')  # Enable search for these fields
