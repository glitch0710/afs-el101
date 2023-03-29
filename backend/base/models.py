from django.db import models

# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    image = models.ImageField(upload_to=None)
    category = models.CharField(max_length=50, blank=True, null=True)
    price = models.IntegerField(null=False, blank=False)
    count_in_servings = models.IntegerField()
    rating = models.IntegerField()
    num_reviews = models.IntegerField()
    