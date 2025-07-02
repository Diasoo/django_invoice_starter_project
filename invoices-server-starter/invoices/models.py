from django.db import models


class Countries(models.TextChoices):
    CZECHIA = 'CZECHIA', 'Czechia'
    SLOVAKIA = 'SLOVAKIA', 'Slovakia'


class Person(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    identificationNumber = models.CharField(max_length=50, db_index=True)
    taxNumber = models.CharField(max_length=50, blank=True, null=True)
    accountNumber = models.CharField(max_length=50)
    bankCode = models.CharField(max_length=20)
    iban = models.CharField(max_length=34, blank=True, null=True)
    telephone = models.CharField(max_length=20)
    mail = models.EmailField()
    street = models.CharField(max_length=100)
    zip = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    country = models.CharField(
        max_length=10,
        choices=Countries.choices,
        default=Countries.CZECHIA
    )
    note = models.TextField(blank=True, null=True)
    hidden = models.BooleanField(default=False, db_index=True)


class Invoice(models.Model):
    invoiceNumber = models.IntegerField(unique=True, db_index=True)
    issued = models.DateField(auto_now_add=True)
    dueDate = models.DateField()
    product = models.CharField(max_length=50)
    price = models.BigIntegerField()
    vat = models.IntegerField()
    note = models.TextField(blank=True, null=True)
    buyer = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='invoices_bought')
    seller = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='invoices_sold')