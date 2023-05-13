from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Food, Order, OrderDetail, Category, Delivery, Review


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
