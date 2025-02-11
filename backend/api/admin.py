from django.contrib import admin
from .models import Patient, Symptom

admin.site.register(Patient)
admin.site.register(Symptom)