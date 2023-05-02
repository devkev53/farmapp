from django.utils.translation import gettext as _
from rest_framework import serializers
from plantations.models import Plantation
from users.api.serializers.user_serializers import CustomUserSerialzer
from plantations.api.serializers.serializers import IrrigationSerializer

# from plantations.api.serializers.ground_serializers import GroundSerializer

class PlantationSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerialzer(read_only=True)
    irrigation = IrrigationSerializer(many=True, read_only=True)

    class Meta:
        model = Plantation
        fields = (
            'id', 'name', 'description', 'duration',
            'function_Kc', 'is_active',
            'created', 'created_by',
            'area', 'perimeter', 'ability',
            'wilting_point', 'thscm', 'irrigation',
        )

class CreatePlantationSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerialzer(read_only=True)

    class Meta:
        model = Plantation
        fields = (
            'id', 'name', 'description', 'duration',
            'function_Kc', 'is_active',
            'created', 'created_by',
            'area', 'perimeter', 'ability',
            'wilting_point', 'thscm',
        )