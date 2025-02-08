from rest_framework import generics
from .models import Symptoms
from rest_framework.response import Response
from .serializers import SymptomsSerializer

# this view handles both GET (lists all symtom data) and POST (create an entry) requests
class SymptomListCreateView(generics.ListCreateAPIView):
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsSerializer

# this view handles both GET (retrieve a specific symptom entry) and PUT (update a specific symptom entry) requests
class SymptomRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsSerializer
    lookup_field = "patient_id"    # we set the lookup parameter in URLs to be the patient_id, by default it's the django auto-gen primary key

    def retrieve(self, request, *args, **kwargs):
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            # Return only the 'symptom_data' field from the serialized data
            return Response(serializer.data.get("symptom_data"))

"""
note how are key operations are BASIC creating, updating, and listing symptom entries
we're not doing anything extra like filtering submitted data etc, so we can use the generic views provided by DRF
hopefully, the names are self-explanatory in what they do
check out their function definitions for more details
notice how this makes the code much more 'cleaner', as much of the basic stuff is abstracted away, do play around with this
"""
