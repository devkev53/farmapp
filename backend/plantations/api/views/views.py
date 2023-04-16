from core.api.views.api_views import CustomBaseViewSet

from rest_framework.permissions import IsAuthenticated
from plantations.api.serializers.serializers import IrrigationSerializer

class IrrigationViewSet(CustomBaseViewSet):
    serializer_class = IrrigationSerializer
    # permission_classes = (IsAuthenticated,)