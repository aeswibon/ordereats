from django.urls import include, path
from rest_framework.routers import DefaultRouter

from orders.views import CartViewSet, OrderViewSet, ProductViewSet, UserViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"cart", CartViewSet, basename="cart")
router.register(r"orders", OrderViewSet, basename="order")
router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    path(
        "api-auth/", include("rest_framework.urls", namespace="rest_framework")
    ),
]
