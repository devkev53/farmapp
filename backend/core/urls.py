from django.urls import path

from core.views import report_all_pdf, report_all_pdf_APIView

urlpatterns = [
    # path('api/report_all_pdf', report_all_pdf, name='report_all_pdf'), 
    path('api/report_all_pdf', report_all_pdf_APIView.as_view(), name='report_all_pdf'), 
]