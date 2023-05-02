from django.utils.translation import gettext as _
from rest_framework import serializers
from plantations.models import Irrigation

class IrrigationSerializer(serializers.ModelSerializer):
    # irrigation = 
    # Irrigation_state
    class Meta:
        model = Irrigation
        fields = (
            'id', 'plantation', 'start_time', 'end_time',
            )