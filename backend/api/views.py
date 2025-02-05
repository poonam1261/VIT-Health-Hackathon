from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Patient, Symptom

class SubmitSymptomsView(APIView):
    def get(self, request):
        # Handle GET request (list all symptoms)
        symptoms = Symptom.objects.all()
        symptom_data = [
            {
                "patient_id": symptom.patient.patient_id,
                "patient_name": symptom.patient.patient_name,
                "symptoms": symptom.symptoms
            }
            for symptom in symptoms
        ]
        return Response(symptom_data, status=status.HTTP_200_OK)

    def post(self, request):
        # Handle POST request (create new symptom entry)
        try:
            payload = request.data
            patient_id = payload.get('patient_id')
            patient_name = payload.get('patient_name')
            symptoms_data = payload.get('patient_symptoms', {})

            # Create/update patient
            patient, _ = Patient.objects.update_or_create(
                patient_id=patient_id,
                defaults={'patient_name': patient_name}
            )

            # Create symptom entry
            Symptom.objects.create(
                patient=patient,
                symptoms=symptoms_data
            )

            return Response({"status": "success"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)