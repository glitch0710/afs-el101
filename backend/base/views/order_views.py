from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Food, Order, OrderDetail, Delivery
from base.serializers import FoodSerializer, OrderSerializer
from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data
    order_items = data['orderItems']

    if order_items and len(order_items) == 0:
        message = {'detail': 'No order items.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            payment_method=data['paymentMethod'],
            transaction_fee=data['transactionFeePrice'],
            total_price=data['totalPrice'],
        )

        deliver = Delivery.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            building=data['shippingAddress']['building'],
            office=data['shippingAddress']['office'],
            shipping_fee=0,
        )

        for i in order_items:
            food = Food.objects.get(pk=i['product'])
            print(food.image.url)
            item = OrderDetail.objects.create(
                order=order,
                food=food,
                name=food.name,
                qty=i['qty'],
                price=round(float(i['price']),2),
                image=food.image.url,
            )

            food.count_in_servings -= item.qty
            food.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    user = request.user

    try:
        order = Order.objects.get(pk=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            message = {'detail': 'Not authorized to view this order.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        message = {'detail': 'Order does not exist.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
