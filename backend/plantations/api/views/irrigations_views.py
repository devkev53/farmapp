from core.api.views.api_views import CustomBaseViewSet
from rest_framework.response import Response
from rest_framework import status



from rest_framework.permissions import IsAuthenticated
from plantations.api.serializers.plantation_serializers import CreatePlantationSerializer
from plantations.api.serializers.irrigations_serializers import IrrigationSerializer, StateIrrigationSerializer

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