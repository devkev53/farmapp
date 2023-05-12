from django.utils.translation import gettext as _
from rest_framework import serializers
from plantations.models import Irrigation, State_Irrigation

class IrrigationSerializer(serializers.ModelSerializer):
    # irrigation = 
    # Irrigation_state
    class Meta:
        model = Irrigation
        fields = (
            'id', 'plantation', 'start_time', 'end_time', 'is_active', 'on_irrigation'
        )

    def validate_start_time(self, value):
        instances = self.Meta.model.objects.filter(plantation=self.context['plantation'])
        for instance in instances:
            if (value >= instance.start_time and value <= instance.end_time):
                raise serializers.ValidationError('Ya existe una programación con este horario de inicio')
        return value
    
    def validate_end_time(self, value):
        instances = self.Meta.model.objects.filter(plantation=self.context['plantation'])
        for instance in instances:
            if (value <= instance.end_time and value >= instance.start_time):
                raise serializers.ValidationError('Ya existe una programación con este horario de finalizacion')
        return value


class StateIrrigationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = State_Irrigation
        fields = '__all__'


class StartIrrigationSerializer(serializers.ModelSerializer):
    state_start_irrigation = serializers.SerializerMethodField()

    class Meta:
        model = Irrigation
        fields = ('state_start_irrigation',)
    
    def state_start_irrigation(self, obj):
        return obj.state_start_irrigation