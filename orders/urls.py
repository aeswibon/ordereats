from django.urls import include, path
from rest_framework.routers import DefaultRouter

from orders.views import CartViewSet, OrderViewSet, ProductViewSet, UserViewSet

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")
router.register("cart", CartViewSet, basename="cart")
router.register("orders", OrderViewSet, basename="order")
router.register("users", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
]
