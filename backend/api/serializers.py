from rest_framework import serializers
from .models import Patient, Symptoms

class PatientSerializer(serializers.ModelSerializer):
    id = serializers.CharField(required=True, read_only=False)      # declare ID as not read_only, so that the react app can specify it.

    class Meta:
        model = Patient
        fields = ["id", "name"]  # it's better to explicitly list the fields for better readability and maintainability


class SymptomsSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())    # specify as not read only, so that we can specify the patient ID manually via React

    class Meta:
        model = Symptoms
        fields = ["patient", "symptom_data"]
