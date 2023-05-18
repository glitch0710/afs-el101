from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('', views.get_users, name='get_users'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.get_user_profile, name='get_user_profile'),
    path('register/', views.register_user, name='register_user'),
]