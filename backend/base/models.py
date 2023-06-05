from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.name


class Food(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    image = models.ImageField(blank=False, null=False, default='/placeholder.png')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(null=False, blank=False, decimal_places=2, max_digits=7)
    count_in_servings = models.IntegerField(blank=True, null=True, default=0)
    rating = models.DecimalField(blank=True, null=True, default=0, decimal_places=2, max_digits=5)
    num_reviews = models.IntegerField(blank=True, null=True, default=0)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    payment_method = models.CharField(max_length=50, blank=False, null=False)
    transaction_fee = models.DecimalField(null=False, blank=False, decimal_places=2, max_digits=7)
    total_price = models.DecimalField(null=False, blank=False, decimal_places=2, max_digits=7)
    is_paid = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    payment_date = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    delivery_date = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.created_date)


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    qty = models.IntegerField(default=0, blank=True, null=True)
    price = models.IntegerField(blank=False, null=True)
    image = models.ImageField(blank=False, null=False)

    def __str__(self):
        return str(self.name)


class Delivery(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=False)
    address = models.TextField(blank=True, null=True)
    building = models.TextField(blank=True, null=True)
    office = models.TextField(blank=True, null=True)
    shipping_fee = models.DecimalField(null=False, blank=False, decimal_places=2, max_digits=7, default=0)

    def __str__(self):
        return str(self.address)


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, default='Anonymous')
    rating = models.IntegerField(blank=True, null=True, default=0)
    comment = models.TextField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)
