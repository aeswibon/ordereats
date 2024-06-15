from django.contrib.auth.models import User
from rest_framework import serializers

from orders.models import Cart, CartItem, Option, OptionList, Order, Product


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "name", "surcharge"]


class OptionListSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = OptionList
        fields = ["id", "name", "selection_type", "options"]


class ProductSerializer(serializers.ModelSerializer):
    option_lists = OptionListSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "base_price",
            "option_lists",
            "image",
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    selected_options = OptionSerializer(many=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "selected_options"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["id", "items"]


class OrderSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, source="cart.items")

    class Meta:
        model = Order
        fields = [
            "id",
            "items",
            "total_price",
            "tax",
            "service_fee",
            "tip",
            "created_at",
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
