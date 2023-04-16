from django.utils.translation import gettext as _
from rest_framework import serializers
from plantations.models import Plantation

from plantations.api.serializers.ground_serializers import GroundSerializer

class PlantationSerializer(serializers.ModelSerializer):
    associated_ground = GroundSerializer(many=True, read_only=True)
    class Meta:
        model = Plantation
        fields = (
            'id', 'name', 'description', 'duration',
            'function_Kc', 'is_active', 'associated_ground', 
        )