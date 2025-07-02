from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import models
import datetime

from ..models import Invoice
from ..serializers import InvoiceSerializer
from ..services import invoice_services

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def list(self, request, *args, **kwargs):
        buyer_id = request.GET.get('buyer_id')
        seller_id = request.GET.get('seller_id')
        product = request.GET.get('product')
        minPrice = request.GET.get('minPrice')
        maxPrice = request.GET.get('maxPrice')
        limit = request.GET.get('limit')

        try:
            queryset = invoice_services.InvoiceFilterService.get_filtered_queryset(
                buyer_id=buyer_id,
                seller_id=seller_id,
                product=product,
                minPrice=minPrice,
                maxPrice=maxPrice,
                limit=limit
            )
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='statistics')
    def get_statistics(self, request):
        current_year = datetime.datetime.now().year
        statistics = Invoice.objects.aggregate(
            currentYearSum=models.Sum('price', filter=models.Q(issued__year=current_year)),
            allTimeSum=models.Sum('price'),
            invoicesCount=models.Count('id'),
        )
        return Response(statistics, status=status.HTTP_200_OK)


class IdentificationInvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    @action(detail=True, methods=['get'], url_path='sales')
    def get_sales(self, request, pk=None):
        identificationNumber = pk
        queryset = invoice_services.InvoiceSellerOrBuyerService.get_filtered_queryset(
            seller_identificationNumber=identificationNumber
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='purchases')
    def get_purchases(self, request, pk=None):
        identificationNumber = pk
        queryset = invoice_services.InvoiceSellerOrBuyerService.get_filtered_queryset(
            buyer_identificationNumber=identificationNumber
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
