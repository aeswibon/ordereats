import json

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from orders.models import Cart, CartItem, Option, OptionList, Order, Product


class AuthenticatedTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpass"
        )
        self.refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {self.refresh.access_token}"
        )


class ProductTests(AuthenticatedTestCase):
    def setUp(self):
        super().setUp()
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
        response = self.client.get("/api/v1/products/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_add_to_cart(self):
        Cart.objects.create(user=self.user)
        response = self.client.post(
            "/api/v1/cart/add_item/",
            data={
                "items": [
                    {
                        "product": self.product.id,
                        "quantity": 2,
                        "selected_options": [
                            {
                                "id": self.option.id,
                                "name": self.option.name,
                                "surcharge": self.option.surcharge,
                            }
                        ],
                    }
                ]
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CartItem.objects.count(), 1)

    def test_order_creation(self):
        cart = Cart.objects.create(user=self.user)
        cart_item = CartItem.objects.create(
            cart=cart, product=self.product, quantity=1
        )
        cart_item.selected_options.add(self.option)

        response = self.client.post(
            "/api/v1/orders/",
            data={
                "items": [
                    {
                        "product": {
                            "name": self.product.name,
                            "description": self.product.description,
                            "base_price": self.product.base_price,
                            "image": self.product.image,
                            "option_lists": [
                                {
                                    "name": self.option_list.name,
                                    "selection_type": self.option_list.selection_type,
                                    "options": [
                                        {
                                            "name": self.option.name,
                                            "surcharge": self.option.surcharge,
                                        }
                                    ],
                                }
                            ],
                        },
                        "quantity": 1,
                        "selected_options": [
                            {
                                "id": self.option.id,
                                "name": self.option.name,
                                "surcharge": self.option.surcharge,
                            }
                        ],
                    }
                ],
                "total_price": 12.00,
                "tax": 1.68,
                "service_fee": 0.60,
                "tip": 0.12,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)

    def test_list_cart_item(self):
        cart = Cart.objects.create(user=self.user)
        cart_item = CartItem.objects.create(
            cart=cart, product=self.product, quantity=1
        )
        cart_item.selected_options.add(self.option)
        response = self.client.get("/api/v1/cart/get_cart/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_cart_item_deletion(self):
        cart = Cart.objects.create(user=self.user)
        cart_item = CartItem.objects.create(
            cart=cart, product=self.product, quantity=1
        )
        cart_item.selected_options.add(self.option)

        response = self.client.post(
            f"/api/v1/cart/remove_item/", {"items": [cart_item.id]}
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(CartItem.objects.count(), 0)


class OptionTests(AuthenticatedTestCase):
    def setUp(self):
        super().setUp()
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


class CartTests(AuthenticatedTestCase):
    def setUp(self):
        super().setUp()
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


class OrderTests(AuthenticatedTestCase):
    def setUp(self):
        super().setUp()
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
        Order.objects.create(
            user=self.user,
            cart=self.cart,
            total_price=12.00,
            tax=1.20,
            service_fee=0.60,
            tip=1.20,
        )
        order_count = Order.objects.count()
        self.assertEqual(order_count, 1)
