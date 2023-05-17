from django.urls import path

from core.views import report_all_pdf

urlpatterns = [
    path('api/report_all_pdf', report_all_pdf, name='report_all_pdf'), 
]