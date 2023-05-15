from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class PermisionPolicyMixin:
    def check_permissions(self, request):
        try:
            handler = getattr(self, request.method.lower())
        except AttributeError:
            handler = None
        
        if (
            handler
            and self.permission_classes_per_method
            and self.permission_classes_per_method.get(handler.__name__)
            ):
            self.permission_classes = self.permission_classes_per_method.get(handler.__name__)
        
        super().check_permissions(request)
        


class CustomBaseViewSet(viewsets.ModelViewSet):

    # Define a custom queryset
    def get_queryset(self, pk=None):
      ''' Obtain the queryset an validate with PK '''
      print(self.queryset)
      if self.queryset is None:
          return self.serializer_class().Meta.model.objects.filter(is_active=True)
      return self.queryset
    
    # Return get or create object
    def get_object(self, pk):
        return get_object_or_404(self.serializer_class.Meta.model, pk=pk)
    
    # List all active Instances Model
    def list(self, request):
        instances = self.get_queryset()
        instances_serializers = self.serializer_class(instances, many=True)
        return Response(instances_serializers.data, status=status.HTTP_200_OK)
  
    # Create a new Instance of Model
    def create(self, request):
        instance_serialier = self.serializer_class(data = request.data)

        if instance_serialier.is_valid():
            instance_serialier.save()
            return Response(instance_serialier.data, status=status.HTTP_201_CREATED)
        
        return Response({
        'error':'check your fields', 'errors':instance_serialier.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    # List Detail a Instance Model
    def retrieve(self, request, pk=None):
        instance = self.get_object(pk)
        instance_serializer = self.serializer_class(instance)
        return Response(instance_serializer.data)
    
      # Update a Instance Model
    def update(self, request, pk=None, *args, **kwargs):
        instance = self.get_object(pk)
        instance_serializer = self.serializer_class(instance, data=request.data, partial=True)
        if instance_serializer.is_valid():
            instance_serializer.save()
            return Response({'message':'instance updated successful'})
        return Response({
        'error':'check your fields', 'errors':instance_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    # Delete a Instance Model (No Delete to DB is a logical change the status)
    def destroy(self, request, pk=None):
        instance_destroy = self.serializer_class.Meta.model.objects.filter(id=pk).update(is_active=False)
        if instance_destroy == 1:
            return Response({'message':'instance deactivate successful'})
        return Response({'error':'instance not found'}, status=status.HTTP_404_NOT_FOUND)