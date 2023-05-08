from core.api.views.api_views import CustomBaseViewSet
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from plantations.api.serializers.ground_serializers import StateGroundSerializer

class StateGroundViewSet(CustomBaseViewSet):
    serializer_class = StateGroundSerializer

    # Define a custom queryset
    def get_queryset(self, pk=None):
      ''' Obtain the queryset an validate with PK '''
      print(self.queryset)
      if self.queryset is None:
          return self.serializer_class().Meta.model.objects.all()
      return self.queryset
