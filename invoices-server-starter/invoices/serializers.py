from rest_framework import serializers
from .models import Person, Invoice


class PersonSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(source="id", read_only=True)
    identificationNumber = serializers.CharField(default=None)

    class Meta:
        model = Person
        fields = [
            'name', 'identificationNumber', 'taxNumber', 'accountNumber',
            'bankCode', 'iban', 'telephone', 'mail', 'street', 'zip',
            'city', 'country', 'note', '_id'
        ]


class InvoiceSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(source="id", read_only=True)
    seller = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all())
    buyer = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all())

    class Meta:
        model = Invoice
        fields = [
            'invoiceNumber', 'seller', 'buyer', 'issued', 'dueDate',
            'product', 'price', 'vat', 'note', '_id'
        ]
        read_only_fields = ['issued']

    def to_internal_value(self, data):
        if isinstance(data.get('seller'), dict):
            data['seller'] = data['seller'].get('_id')
        if isinstance(data.get('buyer'), dict):
            data['buyer'] = data['buyer'].get('_id')
        return super().to_internal_value(data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['seller'] = PersonSerializer(instance.seller).data
        data['buyer'] = PersonSerializer(instance.buyer).data
        return data