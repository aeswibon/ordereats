from django.contrib.auth.models import User
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.TextField(blank=True)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class OptionList(models.Model):
    product = models.ForeignKey(
        Product, related_name="option_lists", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    selection_type = models.CharField(
        max_length=50,
        choices=[
            ("must_select_one", "Must Select One"),
            ("can_select_multiple_or_none", "Can Select Multiple or None"),
        ],
    )

    def __str__(self):
        return f"{self.product.name} - {self.name}"


class Option(models.Model):
    option_list = models.ForeignKey(
        OptionList, related_name="options", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    surcharge = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00
    )

    def __str__(self):
        return f"{self.option_list.product.name} - {self.option_list.name} - {self.name}"


class Cart(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return f"Cart {self.id} - {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart, related_name="items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    selected_options = models.ManyToManyField(Option, blank=True)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    service_fee = models.DecimalField(max_digits=10, decimal_places=2)
    tip = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
