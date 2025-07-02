from ..models import Invoice


class InvoiceSellerOrBuyerService:
    @staticmethod
    def get_filtered_queryset(seller_identificationNumber=None, buyer_identificationNumber=None):
        queryset = Invoice.objects.all()

        if seller_identificationNumber:
            queryset = queryset.filter(seller__identificationNumber=seller_identificationNumber)

        if buyer_identificationNumber:
            queryset = queryset.filter(buyer__identificationNumber=buyer_identificationNumber)

        return queryset


class InvoiceFilterService:
    @staticmethod
    def get_filtered_queryset(buyer_id=None, seller_id=None, product=None, minPrice=None, maxPrice=None, limit=None):
        queryset = Invoice.objects.all()

        if buyer_id:
            queryset = queryset.filter(buyer__id=buyer_id)

        if seller_id:
            queryset = queryset.filter(seller__id=seller_id)

        if product:
            queryset = queryset.filter(product__icontains=product)

        if minPrice is not None:
            try:
                minPrice = int(minPrice)
                queryset = queryset.filter(price__gte=minPrice)
            except ValueError:
                raise ValueError("Minimum price must be an integer.")

        if maxPrice is not None:
            try:
                maxPrice = int(maxPrice)
                queryset = queryset.filter(price__lte=maxPrice)
            except ValueError:
                raise ValueError("Maximum price must be an integer.")

        if limit is not None:
            try:
                limit = int(limit)
                queryset = queryset[:limit]
            except ValueError:
                raise ValueError("Limit must be an integer.")

        return queryset