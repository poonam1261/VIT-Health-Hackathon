from rest_framework import serializers
from .models import Patient, Symptom

class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = ['patient', 'symptoms']