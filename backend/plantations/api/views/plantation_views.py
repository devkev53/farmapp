from django.shortcuts import get_object_or_404
from core.api.views.api_views import CustomBaseViewSet

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from plantations.api.serializers.plantation_serializers import PlantationSerializer

class PlantationViewSet(CustomBaseViewSet):
    serializer_class = PlantationSerializer
    permission_classes = (IsAuthenticated,)


    # def get_queryset(self, pk=None):
    #   ''' Obtain the queryset an validate with PK '''
    #   print(self.queryset)
    #   if self.queryset is None:
    #       return self.serializer_class().Meta.model.objects.filter(is_active=True)
    #   return self.queryset
    
    # def get_object(self, pk):
    #     return get_object_or_404(self.serializer_class.Meta.model, pk=pk)
    
    # # List all active plantations
    # def list(self, request):
    #     plantations = self.get_queryset()
    #     plantations_serializers = self.serializer_class(plantations, many=True)
    #     return Response(plantations_serializers.data, status=status.HTTP_200_OK)
  
    # # Create a new Platation
    # def create(self, request, *args, **kwargs):
    #     plantation_serialier = self.serializer_class(data = request.data)

    #     if plantation_serialier.is_valid():
    #         plantation_serialier.save()
    #         return Response(plantation_serialier.data, status=status.HTTP_201_CREATED)
        
    #     return Response({
    #     'error':'check your fields', 'errors':plantation_serialier.errors
    #     }, status=status.HTTP_400_BAD_REQUEST)

    # # List Detail a Plantation
    # def retrieve(self, request, pk=None):
    #     plantation = self.get_object(pk)
    #     plantation_serializer = self.serializer_class(plantation)
    #     return Response(plantation_serializer.data)
    
    #   # Update a Plantation
    # def update(self, request, pk=None):
    #     plantation = self.get_object(pk)
    #     plantation_serializer = self.serializer_class(plantation, data=request.data)
    #     if plantation_serializer.is_valid():
    #         plantation_serializer.save()
    #         return Response({'message':'plantation updated successful'})
    #     return Response({
    #     'error':'check your fields', 'errors':plantation_serializer.errors
    #     }, status=status.HTTP_400_BAD_REQUEST)

    # # Delete a Plantation (No Delete to DB is a logical change the status)
    # def destroy(self, request, pk=None):
    #     plantation_destroy = self.serializer_class.Meta.model.objects.filter(id=pk).update(is_active=False)
    #     if plantation_destroy == 1:
    #         return Response({'message':'plantation deactivate successful'})
    #     return Response({'error':'plantation not found'}, status=status.HTTP_404_NOT_FOUND)