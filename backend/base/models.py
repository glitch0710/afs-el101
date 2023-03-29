from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)


class Food(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    name = models.CharField(max_length=100, blank=False, null=False)
    image = models.ImageField(upload_to=None)
    category = models.ForeignKey(Category, models.DO_NOTHING)
    price = models.IntegerField(null=False, blank=False)
    count_in_servings = models.IntegerField(blank=True, null=True)
    rating = models.IntegerField(blank=True, null=True)
    num_reviews = models.IntegerField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    payment_method = models.CharField(max_length=50, blank=False, null=False)
    transaction_fee = models.IntegerField(blank=False, null=False)
    total_price = models.IntegerField(blank=False, null=False)
    is_paid = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    payment_date = models.DateTimeField()
    delivery_date = models.DateTimeField()
    created_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, models.DO_NOTHING)


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, models.DO_NOTHING)
    food = models.ForeignKey(Food, models.DO_NOTHING)
    name = models.CharField(max_length=100, null=False, blank=False)
    qty = models.IntegerField(default=1)
    price = models.IntegerField(blank=False, null=True)
    image = models.ImageField(upload_to=None)


class Delivery(models.Model):
    order = models.ForeignKey(Order, models.DO_NOTHING)
    address = models.TextField(blank=False, null=False)
    shipping_fee = models.IntegerField(default=0)


class Review(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    food = models.ForeignKey(Food, models.DO_NOTHING)
    name = models.CharField(max_length=100, default='Anonymous')
    rating = models.IntegerField(blank=False, null=False)
    comment = models.TextField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

