from django.urls import path
from .views import SymptomListCreateView, SymptomRetrieveUpdateView, PatientListCreateView, PatientRetrieve

# we pass 'pk' as the URL argument, which is the same as saying <str:pk_field_name>, as we have specified custom pks in models
urlpatterns = [
    path("patients/", PatientListCreateView.as_view(), name="patient-list-create"),
    path("patients/<str:pk>/", PatientRetrieve.as_view(), name="patient-retrieve"),

    path("symptoms/", SymptomListCreateView.as_view(), name="symptom-list-create"), # 'list view' which allows us to list all symptom entries and 'create view' which allows us to create a new symptom entry
    path("symptoms/<str:pk>/", SymptomRetrieveUpdateView.as_view(), name="symptom-retrieve-update"), # 'detail view' which allows us to update a specific symptom entry
]
