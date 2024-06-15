from django.http import JsonResponse


def ping(_):
    return JsonResponse({"status": "OK"})
