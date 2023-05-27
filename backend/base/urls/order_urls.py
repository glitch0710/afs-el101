from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('add/', views.add_order_items, name='add_order_items'),
    path('<str:pk>/', views.get_order_by_id, name='get_order_by_id'),
    path('<str:pk>/pay', views.update_order_to_paid, name='update_order_to_paid'),
]
