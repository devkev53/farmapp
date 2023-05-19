from rest_framework import serializers


class DateReportSerializer(serializers.Serializer):
    
    start_date = serializers.DateField()
    end_date = serializers.DateField()

    def validate(self, data):
      if data['start_date'] > data['end_date']:
          raise serializers.ValidationError("Check your dates")
      return data