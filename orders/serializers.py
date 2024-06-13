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
        fields = ["id", "name", "base_price", "option_lists"]


class CartItemSerializer(serializers.ModelSerializer):
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
    cart = CartSerializer()

    class Meta:
        model = Order
        fields = [
            "id",
            "cart",
            "total_price",
            "tax",
            "service_fee",
            "tip",
            "created_at",
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
