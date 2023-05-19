from django.urls import path

from core.views import ReportaAllPDFAPIView, PlantationPFD

urlpatterns = [
    # path('api/report_all_pdf', report_all_pdf, name='report_all_pdf'), 
    path('api/report_all_pdf', ReportaAllPDFAPIView.as_view(), name='report_all_pdf'),
    path('api/plantation_report_pdf/<int:pk>/', PlantationPFD.as_view(), name='plantation_pdf'),
]