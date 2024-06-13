from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema, extend_schema_view
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


@extend_schema_view(
    list=extend_schema(summary="List all products", tags=["products"]),
    create=extend_schema(summary="Create a product", tags=["products"]),
    retrieve=extend_schema(summary="Retrieve a product", tags=["products"]),
    update=extend_schema(summary="Update a product", tags=["products"]),
    partial_update=extend_schema(
        summary="Partially update a product", tags=["products"]
    ),
    destroy=extend_schema(summary="Delete a product", tags=["products"]),
)
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]


@extend_schema_view(
    list=extend_schema(summary="List all cart items", tags=["cart"]),
    create=extend_schema(summary="Create a cart item", tags=["cart"]),
    retrieve=extend_schema(summary="Retrieve a cart item", tags=["cart"]),
    update=extend_schema(summary="Update a cart item", tags=["cart"]),
    partial_update=extend_schema(
        summary="Partially update a cart item", tags=["cart"]
    ),
    destroy=extend_schema(summary="Delete a cart item", tags=["cart"]),
)
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


@extend_schema_view(
    list=extend_schema(summary="List all orders", tags=["orders"]),
    create=extend_schema(summary="Create an order", tags=["orders"]),
    retrieve=extend_schema(summary="Retrieve an order", tags=["orders"]),
    update=extend_schema(summary="Update an order", tags=["orders"]),
    partial_update=extend_schema(
        summary="Partially update an order", tags=["orders"]
    ),
    destroy=extend_schema(summary="Delete an order", tags=["orders"]),
)
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


@extend_schema_view(
    list=extend_schema(summary="List all users", tags=["users"]),
    create=extend_schema(summary="Create a user", tags=["users"]),
    retrieve=extend_schema(summary="Retrieve a user", tags=["users"]),
    update=extend_schema(summary="Update a user", tags=["users"]),
    partial_update=extend_schema(
        summary="Partially update a user", tags=["users"]
    ),
    destroy=extend_schema(summary="Delete a user", tags=["users"]),
)
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
