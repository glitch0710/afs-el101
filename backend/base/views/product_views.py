from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from base.products import products
from base.models import Food
from django.contrib.auth.models import User
from base.serializers import FoodSerializer


@api_view(['GET'])
def get_products(request):
    products = Food.objects.all()
    serializer = FoodSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    product = Food.objects.get(pk=pk)
    serializer = FoodSerializer(product, many=False)
    return Response(serializer.data)