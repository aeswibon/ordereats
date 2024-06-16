from django.core import management
from django.core.management import BaseCommand, CommandError


class Command(BaseCommand):
    """
    Management command to seed data with the product catalog
    Usage: python manage.py load_data
    """

    help = "Loads data into the database with the product catalog."
    BASE_URL = "data/"

    def handle(self, *args, **options):
        try:
            management.call_command(
                "loaddata",
                self.BASE_URL + "users.json",
                self.BASE_URL + "cart.json",
                self.BASE_URL + "products.json",
                self.BASE_URL + "optionlists.json",
                self.BASE_URL + "options.json",
            )
        except Exception as e:
            raise CommandError(e)
