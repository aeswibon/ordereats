from django.contrib import admin

from orders.models import Cart, CartItem, Option, OptionList, Order, Product

admin.site.register(Product)
admin.site.register(Option)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(OptionList)
admin.site.register(Order)
