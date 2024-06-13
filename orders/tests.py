from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from .models import Cart, CartItem, Option, OptionList, Order, Product


class ProductTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.client = APIClient()
        self.client.login(username="testuser", password="testpass")
        self.product = Product.objects.create(
            name="Chicken Biryani", base_price=10.00
        )
        self.option_list = OptionList.objects.create(
            product=self.product,
            name="Spicy Level",
            selection_type="must_select_one",
        )
        self.option = Option.objects.create(
            option_list=self.option_list, name="Medium", surcharge=1.00
        )

    def test_product_creation(self):
        product_count = Product.objects.count()
        self.assertEqual(product_count, 1)

    def test_get_product_list(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_add_to_cart(self):
        cart = Cart.objects.create(user=self.user)
        response = self.client.post(
            f"/api/cart/{cart.id}/add_item/",
            {
                "product_id": self.product.id,
                "quantity": 1,
                "selected_options": [self.option.id],
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CartItem.objects.count(), 1)

    def test_order_creation(self):
        cart = Cart.objects.create(user=self.user)
        cart_item = CartItem.objects.create(
            cart=cart, product=self.product, quantity=1
        )
        cart_item.selected_options.add(self.option)

        response = self.client.post("/api/orders/", {})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)


class OptionTests(TestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name="Chicken Biryani", base_price=10.00
        )
        self.option_list = OptionList.objects.create(
            product=self.product,
            name="Spicy Level",
            selection_type="must_select_one",
        )
        self.option = Option.objects.create(
            option_list=self.option_list, name="Medium", surcharge=1.00
        )

    def test_option_creation(self):
        option_count = Option.objects.count()
        self.assertEqual(option_count, 1)


class CartTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.product = Product.objects.create(
            name="Chicken Biryani", base_price=10.00
        )
        self.option_list = OptionList.objects.create(
            product=self.product,
            name="Spicy Level",
            selection_type="must_select_one",
        )
        self.option = Option.objects.create(
            option_list=self.option_list, name="Medium", surcharge=1.00
        )
        self.cart = Cart.objects.create(user=self.user)

    def test_cart_creation(self):
        cart_count = Cart.objects.count()
        self.assertEqual(cart_count, 1)

    def test_cart_item_creation(self):
        cart_item = CartItem.objects.create(
            cart=self.cart, product=self.product, quantity=1
        )
        cart_item.selected_options.add(self.option)
        self.assertEqual(CartItem.objects.count(), 1)


class OrderTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.product = Product.objects.create(
            name="Chicken Biryani", base_price=10.00
        )
        self.option_list = OptionList.objects.create(
            product=self.product,
            name="Spicy Level",
            selection_type="must_select_one",
        )
        self.option = Option.objects.create(
            option_list=self.option_list, name="Medium", surcharge=1.00
        )
        self.cart = Cart.objects.create(user=self.user)
        self.cart_item = CartItem.objects.create(
            cart=self.cart, product=self.product, quantity=1
        )
        self.cart_item.selected_options.add(self.option)

    def test_order_creation(self):
        order = Order.objects.create(
            user=self.user,
            cart=self.cart,
            total_price=12.00,
            tax=1.20,
            service_fee=0.60,
            tip=1.20,
        )
        order_count = Order.objects.count()
        self.assertEqual(order_count, 1)
