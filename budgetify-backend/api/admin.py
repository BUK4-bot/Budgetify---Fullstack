from django.contrib import admin
from .models import Transaction

# Rejestrujemy tylko model Transaction w panelu admina
admin.site.register(Transaction)