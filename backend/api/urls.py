from django.urls import path
from .views import SymptomListCreateView, SymptomUpdateView

urlpatterns = [
    path("symptoms/", SymptomListCreateView.as_view(), name="symptom-list-create"), # 'list view' which allows us to list all symptom entries and 'create view' which allows us to create a new symptom entry
    path("symptoms/<int:patient_id>/", SymptomUpdateView.as_view(), name="symptom-update"), # 'detail view' which allows us to update a specific symptom entry
]
