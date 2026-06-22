from django.db import models

class Transaction(models.Model):
    CATEGORY_CHOICES = [
        ('Spożywcze', 'Spożywcze'),
        ('Transport', 'Transport'),
        ('Rozrywka', 'Rozrywka'),
        ('Rachunki', 'Rachunki'),
        ('Inne', 'Inne'),
    ]

    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Inne')
    is_expense = models.BooleanField(default=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.amount} zł)"