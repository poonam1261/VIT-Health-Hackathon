from rest_framework import generics
from .models import Symptoms, Patient
from rest_framework.response import Response
from .serializers import SymptomsSerializer, PatientSerializer

class PatientListCreateView(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientRetrieve(generics.RetrieveAPIView):        # Retrieve view so that React can verify whether the user already exists
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

# this view handles both GET (lists all symtom data) and POST (create an entry) requests
class SymptomListCreateView(generics.ListCreateAPIView):
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsSerializer

# this view handles both GET (retrieve a specific symptom entry) and PUT (update a specific symptom entry) requests
class SymptomRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsSerializer

    def retrieve(self, request, *args, **kwargs):
            instance = self.get_object()        # current object being referred to in request ex:symptoms/4
            serializer = self.get_serializer(instance)
            return Response({
                    "message": "Auto deploy test successful?",  # Add this line
                    "data": serializer.data
                })

"""
note how are key operations are BASIC creating, updating, and listing symptom entries
we're not doing anything extra like filtering submitted data etc, so we can use the generic views provided by DRF
in the case of GET, I want to only return the symptoms JSON, so I override the RETRIEVE functionality
hopefully, the names are self-explanatory in what they do
check out their function definitions for more details
notice how this makes the code much more 'cleaner', as much of the basic stuff is abstracted away, do play around with this
"""
