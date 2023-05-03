from core.api.views.api_views import CustomBaseViewSet
from rest_framework.response import Response
from rest_framework import status



from rest_framework.permissions import IsAuthenticated
from plantations.api.serializers.plantation_serializers import CreatePlantationSerializer
from plantations.api.serializers.serializers import IrrigationSerializer

class IrrigationViewSet(CustomBaseViewSet):
    serializer_class = IrrigationSerializer
    # permission_classes = (IsAuthenticated,)

    def destroy(self, request, pk=None):
        instance_destroy = self.serializer_class.Meta.model.objects.filter(id=pk)
        if instance_destroy:
            instance_destroy.delete()
            return Response({'message':'instance deactivate successful'}, status=status.HTTP_200_OK)
        return Response({'error':'instance not found'}, status=status.HTTP_404_NOT_FOUND)
    