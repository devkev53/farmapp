from django.utils.translation import gettext as _
from rest_framework import serializers
from plantations.models import State_Ground

# from plantations.api.serializers.serializers import IrrigationSerializer

# class GroundSerializer(serializers.ModelSerializer):
#     irrigation = IrrigationSerializer(many=True, read_only=True)
#     # ground_state
#     class Meta:
#         model = Ground
#         fields = (
#             'plantation', 'id', 'area', 'perimeter', 
#             'ability', 'wilting_point', 'thscm',
#             'irrigation'
#             )


class StateGroundSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = State_Ground
        fields = '__all__'