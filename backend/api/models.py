from django.db import models

class Patient(models.Model):
    patient_id = models.IntegerField(primary_key=True)
    patient_name = models.CharField(max_length=255)

    def __str__(self):
        return self.patient_name

class Symptom(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    symptoms = models.JSONField()  # Stores {"cough": 0, "fever": 1}

    def __str__(self):
        return f"Symptoms for {self.patient.patient_name}"