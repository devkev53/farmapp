"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from core.api.views.auth_views import Login, Logout
from core.views import test, send_mail_to_all

# from plantations.views import plantation_pdf
from plantations.api.views.plantation_views import IsActiveIrrigation
from plantations.api.views.ground_views import StateGroundAPIView
from plantations.api.views.irrigations_views import AddStateIrrigationAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', test, name='test'),
    # path('sendMail', send_mail_to_all, name='sendMail'),


    path('api/', include('core.api.router')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', Login.as_view(), name='login'),
    path('logout/', Logout.as_view(), name='logout'),
    
    # path('api/plantation_report_pdf/<int:pk>/', plantation_pdf, name='plantation_pdf'),
    path('api/<slug:slug>/activate-irrigation/', IsActiveIrrigation.as_view(), name='active_irrigation'),
    
    path('api/<slug:slug>/ground_state/', StateGroundAPIView.as_view(), name='state_ground'),
    path('api/<slug:slug>/add_data_irrigation/', AddStateIrrigationAPIView.as_view(), name='state_ground'),
    path('', include("core.urls"))
  
]

# Import for control debug nad view static and media files
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)