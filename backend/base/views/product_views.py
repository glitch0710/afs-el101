from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from base.products import products
from base.models import Food, Review
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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    product = Food.objects.create(
        user=user,
        name='Food Name',
        price=0,
        count_in_servings=0,
    )
    serializer = FoodSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data
    product = Food.objects.get(pk=pk)

    product.name = data['name']
    product.price = data['price']
    product.count_in_servings = data['count_in_servings']
    product.save()

    serializer = FoodSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Food.objects.get(pk=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
def upload_image(request):
    data = request.data

    product_id = data['product_id']
    product = Food.objects.get(pk=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_food_review(request, pk):
    user = request.user
    product = Food.objects.get(pk=pk)
    data = request.data

    exists = product.review_set.filter(user=user).exists()

    if exists:
        message = {'detail': 'Food already reviewed'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    elif data['rating'] == 0:
        message = {'detail': 'Please select a rating'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        review = Review.objects.create(
            user=user,
            food=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.num_reviews = len(reviews)

        total = 0
        for rvw in reviews:
            total += rvw.rating

        product.rating = total/len(reviews)
        product.save()

        message = {'detail': 'Review successfully added'}
        return Response(message)
    
