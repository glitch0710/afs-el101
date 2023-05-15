from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('products/', views.get_products, name='products'),
    path('product/<str:pk>', views.get_product, name='product'),

    # JWT
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile', views.get_user_profile, name='get_user_profile'),
]
