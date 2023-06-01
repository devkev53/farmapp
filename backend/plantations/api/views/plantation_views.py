from django.shortcuts import get_object_or_404
from core.api.views.api_views import CustomBaseViewSet

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import generics

from plantations.models import Plantation

from plantations.api.serializers.plantation_serializers import PlantationSerializer, \
    CreatePlantationSerializer, ActivateIrrigationSerialzier

class PlantationViewSet(CustomBaseViewSet):
    serializer_class = PlantationSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        print("Entrando")
        print(request.data)
        if (request.data["area"] == ''):
            request.data["area"] = 0
        if (request.data["perimeter"] == ''):
            request.data["perimeter"] = 0
        if (request.data["ability"] == ''):
            request.data["ability"] = 0
        if (request.data["wilting_point"] == ''):
            request.data["wilting_point"] = 0
        instance_serializer = CreatePlantationSerializer(data = request.data)

        if instance_serializer.is_valid():
            print("Data is Ok")
            instance_serializer.save()
            return Response(instance_serializer.data, status=status.HTTP_201_CREATED)

        
        return Response({
        'error':'check your fields', 'errors':instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    


class IsActiveIrrigation(generics.GenericAPIView):

    def get(self, request, slug=None):
        try:
            queryset = Plantation.objects.filter(thscm=slug, is_active=True).get()
            activate = queryset.activate_irrigation()
            return Response({"active": activate}, status=status.HTTP_200_OK)
        except:
            return Response({
                'error': 'This device THSCM, no has asociated with plantation..!'
            }, status=status.HTTP_400_BAD_REQUEST)
