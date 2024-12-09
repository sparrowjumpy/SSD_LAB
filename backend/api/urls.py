from django.urls import path
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenBlacklistView)

urlpatterns = [
    path('auth/register', views.RegisterView.as_view(), name='register'),
    path('auth/login', TokenObtainPairView.as_view(), name='login'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout', TokenBlacklistView.as_view(), name='logout'),

    path('users/me', views.MeView.as_view(), name='me'),
    path('posts', views.PostListView.as_view(), name='posts'),
    path('posts/create', views.CreatePostView.as_view(), name='create_post'),
    path('messages/send', views.SendMessageView.as_view(), name='send_message'),
	path('messages', views.GetMessagesView.as_view(), name='get_messages'),
]
