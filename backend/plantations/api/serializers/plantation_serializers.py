from django.utils.translation import gettext as _
from rest_framework import serializers
from plantations.models import Plantation
from users.api.serializers.user_serializers import CustomUserSerialzer
from plantations.api.serializers.irrigations_serializers import IrrigationSerializer

# from plantations.api.serializers.ground_serializers import GroundSerializer

class PlantationSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerialzer(read_only=True)
    irrigation = IrrigationSerializer(many=True, read_only=True)
    estimated_date_for_harvest = serializers.SerializerMethodField()
    estimated_days_for_harvest = serializers.SerializerMethodField()
    total_water = serializers.SerializerMethodField()

    class Meta:
        model = Plantation
        fields = (
            'id', 'name', 'description', 'duration',
            'function_Kc', 'is_active',
            'created', 'created_by',
            'area', 'perimeter', 'ability',
            'wilting_point', 'thscm', 'irrigation', 
            'estimated_date_for_harvest', 'estimated_days_for_harvest',
            'used_water', 'total_water'
        )
    
    def total_water(self, obj):
        return obj.total_water
    
    def estimated_date_for_harvest(self, obj):
        return obj.estimated_date_for_harvest
    
    def estimated_days_for_harvest(self, obj):
        return obj.estimated_days_for_harvest

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


class ActivateIrrigationSerialzier(serializers.ModelSerializer):
    activate_irrigation = serializers.SerializerMethodField()

    class Meta:
        model = Plantation
        fields = (
            'activate_irrigation',
        )
    
    def activate_irrigation(self, obj):
        return obj.activate_irrigation
