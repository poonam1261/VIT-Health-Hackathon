from django.db import models

# we specify a custom patientID so that we can use the same UID as assigned by Firebase
class Patient(models.Model):
    id = models.CharField(primary_key=True, max_length=36)      # stores firebase UID as a STRING
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Symptoms(models.Model):
    # in this case, we do want to explictly define the primary key, as we are not using django's auto generated primary key, but the patient's id
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, primary_key=True)       # note that it is also a foreign key
    symptom_data = models.JSONField()  # Stores {"cough": 0, "fever": 1}

    def __str__(self):
        return f"Symptoms for {self.patient.name}"
