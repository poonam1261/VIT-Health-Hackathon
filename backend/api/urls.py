from django.urls import path
from .views import SubmitSymptomsView

urlpatterns = [
    path('symptoms/', SubmitSymptomsView.as_view(), name='submit-symptoms'),
]