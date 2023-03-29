from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products
from .models import Food
from .serializers import FoodSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/products',
        '/api/products',
        '/api/products/upload',
        '/api/products/<id>/reviews',
        '/api/products/top',
        '/api/products/<id>',
        '/api/products/delete/<id>',
        '/api/products/update/<id>',
    ]

    return Response(routes)


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
