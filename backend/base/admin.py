from django.contrib import admin
from .models import Food, Order, OrderDetail, Category, Delivery, Review

# Register your models here.
admin.site.register(Food)
admin.site.register(Order)
admin.site.register(OrderDetail)
admin.site.register(Category)
admin.site.register(Delivery)
admin.site.register(Review)