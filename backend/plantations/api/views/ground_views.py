from core.api.views.api_views import CustomBaseViewSet
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics

from collections import OrderedDict

from plantations.models import Plantation

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

    # def create(self, request, pk=None):


class StateGroundAPIView(generics.GenericAPIView):
    serializer_class = StateGroundSerializer

    def get_queryset(self, pk=None):
      ''' Obtain the queryset an validate with PK '''
      print(self.queryset)
      if self.queryset is None:
          return self.serializer_class().Meta.model.objects.all()
      return self.queryset

    def get(self, request, slug=None):
        try:
            plantation = Plantation.objects.filter(thscm=slug, is_active=True).get()
            ground_states = self.serializer_class.Meta.model.objects.filter(plantation=plantation.pk)
            groundState_serializer = self.serializer_class(ground_states, many=True)
            return Response(groundState_serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({
            'error':'This THSCM no exists..!'}, status=status.HTTP_400_BAD_REQUEST)
    

    def post(self, request, slug=None, *args, **kwargs):
        print('Request: ', request.data)
        try:
            plantation = Plantation.objects.filter(thscm=slug, is_active=True).get()
            new_data = request.data.copy()
            new_data['plantation'] = plantation.pk
            # print(new_data)
            groundState_serialzier = StateGroundSerializer(data = new_data)
            # print(groundState_serialzier)
            if groundState_serialzier.is_valid():
                groundState_serialzier.save() 
                return Response(groundState_serialzier.data, status=status.HTTP_201_CREATED)
            return Response({
                'error':'check your fields', 'errors':groundState_serialzier.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({
            'error':'This THSCM no exists..!'}, status=status.HTTP_400_BAD_REQUEST)
