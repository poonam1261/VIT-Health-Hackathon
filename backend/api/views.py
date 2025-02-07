# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Patient, Symptom

# class SubmitSymptomsView(APIView):
#     def get(self, request):
#         # Handle GET request (list all symptoms)
#         symptoms = Symptom.objects.all()
#         symptom_data = [
#             {
#                 "patient_id": symptom.patient.patient_id,
#                 "patient_name": symptom.patient.patient_name,
#                 "symptoms": symptom.symptoms
#             }
#             for symptom in symptoms
#         ]
#         return Response(symptom_data, status=status.HTTP_200_OK)

#     def post(self, request):
#         # Handle POST request (create new symptom entry)

from rest_framework import generics
from .models import Symptoms
from .serializers import SymptomsSerializer

# this view handles both GET (lists all symtom data) and POST (create an entry) requests
class SymptomListCreateView(generics.ListCreateAPIView):
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsSerializer

# this view handles both GET (retrieve a specific symptom entry) and PUT (update a specific symptom entry) requests
class SymptomUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsSerializer
    lookup_field = "patient_id"    # we set the lookup parameter in URLs to be the patient_id, by default it's the django auto-gen primary key

"""
note how are key operations are BASIC creating, updating, and listing symptom entries
we're not doing anything extra like filtering submitted data etc, so we can use the generic views provided by DRF
hopefully, the names are self-explanatory in what they do
check out their function definitions for more details
notice how this makes the code much more 'cleaner', as much of the basic stuff is abstracted away, do play around with this
"""
