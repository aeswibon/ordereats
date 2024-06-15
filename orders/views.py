from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status, viewsets
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


class ProductViewSet(
    viewsets.GenericViewSet,
    viewsets.mixins.ListModelMixin,
):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


class CartViewSet(viewsets.GenericViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @extend_schema(summary="Add an item to the cart", tags=["cart"])
    @action(detail=False, methods=["post"])
    def add_item(self, request, pk=None):
        cart = Cart.objects.get(user=request.user)
        items = request.data.get("items", [])
        product = Product.objects.get(id=items[0]["product"])
        quantity = items[0].get("quantity", 1)
        selected_options = items[0].get("selected_options", [])

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, product=product, defaults={"quantity": quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        for option in selected_options:
            cart_item.selected_options.add(option["id"])
        cart_item.save()

        return Response(CartItemSerializer(cart_item).data)

    @extend_schema(summary="Remove an item from the cart", tags=["cart"])
    @action(detail=False, methods=["post"])
    def remove_item(self, request, pk=None):
        cart = Cart.objects.get(user=request.user)
        items = request.data.get("items", [])
        product = Product.objects.get(id=items[0])
        cart_item = CartItem.objects.get(cart=cart, product=product)
        cart_item.quantity -= 1
        cart_item.save()
        if cart_item.quantity == 0:
            cart_item.delete()

        return Response(CartItemSerializer(cart_item).data)

    @extend_schema(summary="Get the cart", tags=["cart"])
    @action(detail=False, methods=["get"])
    def get_cart(self, request):
        cart = Cart.objects.get(user=request.user)
        return Response(CartSerializer(cart).data)


class OrderViewSet(viewsets.GenericViewSet, viewsets.mixins.CreateModelMixin):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        cart = Cart.objects.get(user=self.request.user)
        total_price = self.request.data.get("total_price", 0)
        tax = self.request.data.get("tax", 0)
        service_fee = 0
        tip = 0

        serializer.save(
            user=self.request.user,
            cart=cart,
            total_price=total_price,
            tax=tax,
            service_fee=service_fee,
            tip=tip,
        )

        CartItem.objects.filter(cart=cart).delete()


class UserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[permissions.IsAuthenticated],
    )
    def me(self, request):
        return Response(UserSerializer(request.user).data)

    @action(detail=False, methods=["post"])
    def add_user(self, request):
        password = request.data.pop(
            "password", User.objects.make_random_password(length=8)
        )
        serializer = UserSerializer(
            data={**request.data, "password": make_password(password)},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        Cart.objects.create(user=serializer.instance)
        return Response(status=status.HTTP_201_CREATED)
