from django.urls import path, include
from .routers import SlashOptionalRouter
from .views.invoice_views import InvoiceViewSet, IdentificationInvoiceViewSet

from .views.person_views import PersonViewSet

router = SlashOptionalRouter()
router.register(r'persons', PersonViewSet)
router.register(r'invoices', InvoiceViewSet)
router.register(r'identification', IdentificationInvoiceViewSet, basename='identification')

urlpatterns = [
    path('api/', include(router.urls)),
]
