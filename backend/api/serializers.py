from rest_framework import serializers
from .models import Patient, Symptoms

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["id", "name"]  # it's better to explicitly list the fields for better readability and maintainability


class SymptomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptoms
        fields = ["patient", "symptom_data"]
