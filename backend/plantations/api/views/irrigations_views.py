from django.shortcuts import get_object_or_404

from core.api.views.api_views import CustomBaseViewSet
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework import generics

from plantations.models import Irrigation, Plantation


from rest_framework.permissions import IsAuthenticated
from plantations.api.serializers.plantation_serializers import CreatePlantationSerializer
from plantations.api.serializers.irrigations_serializers import IrrigationSerializer, StateIrrigationSerializer, StartIrrigationSerializer

class IrrigationViewSet(CustomBaseViewSet):
    serializer_class = IrrigationSerializer
    # permission_classes = (IsAuthenticated,)

    def destroy(self, request, pk=None):
        instance_destroy = self.serializer_class.Meta.model.objects.filter(id=pk)
        if instance_destroy:
            instance_destroy.delete()
            return Response({'message':'instance deactivate successful'}, status=status.HTTP_200_OK)
        return Response({'error':'instance not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Create a new Instance of Model
    def create(self, request):
        instance_serialier = self.serializer_class(data = request.data, context = request.data)

        if instance_serialier.is_valid():
            instance_serialier.save()
            return Response(instance_serialier.data, status=status.HTTP_201_CREATED)
        
        return Response({
        'error':'check your fields', 'errors':instance_serialier.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class StateIrrigationViewSet(CustomBaseViewSet):
    serializer_class = StateIrrigationSerializer

    # Define a custom queryset
    def get_queryset(self, pk=None):
      ''' Obtain the queryset an validate with PK '''
      print(self.queryset)
      if self.queryset is None:
          return self.serializer_class().Meta.model.objects.all()
      return self.queryset


class ManualActiveIrrgation(viewsets.ModelViewSet):
    serializer_class = StateIrrigationSerializer

    @action(detail=True, methods=['get'], url_path='active_irrigation')
    def active(self, request, pk=None):
        plantation = Plantation.objects.filter(pk=pk).get()
        first_irrigation = Irrigation.objects.filter(plantation__pk=plantation.pk).first()
        first_irrigation.on_irrigation = True
        first_irrigation.save()
        return Response({
            'success': 'irrigation is on'
        }, status=status.HTTP_200_OK)


    @action(detail=True, methods=['get'], url_path='deactive_irrigation')
    def deactive(self, request, pk=None):
        plantation = Plantation.objects.filter(pk=pk).get()
        first_irrigation = Irrigation.objects.filter(plantation__pk=plantation.pk).first()
        first_irrigation.on_irrigation = False
        first_irrigation.save()
        return Response({
            'success': 'irrigation is off'
        }, status=status.HTTP_200_OK)




class ActivateManualIrrigation(generics.GenericAPIView):
    # serializer_class = StateIrrigationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Irrigation, pk=pk)

    def get(self, request, pk=None, *args, **kwargs):
            plantation = self.get_object(pk)
            first_irrigation = Irrigation.objects.filter(plantation__pk=plantation.pk).first()
            first_irrigation.on_irrigation = True
            first_irrigation.save()
            return Response({
                'success': 'irrigation is on'
            }, status=status.HTTP_200_OK)


class DeactivateManualIrrigation(generics.GenericAPIView):
    # serializer_class = StateIrrigationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        try:
            first_irrigation = Irrigation.objects.filter(plantation__pk=pk).first()
            first_irrigation.on_irrigation = False
            first_irrigation.save()
            return Response({
                'success': 'irrigation is off'
            }, status=status.HTTP_200_OK)
        except:
            return Response({
            'error':'This plantation not exists..!'}, status=status.HTTP_400_BAD_REQUEST)