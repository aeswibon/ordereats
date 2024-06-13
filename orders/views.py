from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from orders.models import Cart, CartItem, Order, Product
from orders.serializers import (
    CartItemSerializer,
    CartSerializer,
    OrderSerializer,
    ProductSerializer,
    UserSerializer,
)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @extend_schema(summary="Add an item to the cart", tags=["cart"])
    @action(detail=True, methods=["post"])
    def add_item(self, request, pk=None):
        cart = self.get_object()
        product = Product.objects.get(id=request.data["product_id"])
        quantity = request.data.get("quantity", 1)
        selected_options = request.data.get("selected_options", [])

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, product=product, defaults={"quantity": quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        cart_item.selected_options.set(selected_options)
        cart_item.save()

        return Response(CartItemSerializer(cart_item).data)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        cart = Cart.objects.get(user=self.request.user)
        total_price = sum(
            item.product.base_price * item.quantity
            for item in cart.items.all()
        )
        tax = total_price * 0.1
        service_fee = total_price * 0.05
        tip = total_price * 0.1

        serializer.save(
            user=self.request.user,
            cart=cart,
            total_price=total_price,
            tax=tax,
            service_fee=service_fee,
            tip=tip,
        )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
