from django.db import models

# note that there's no need to specify a patientID, django automatically creates a primary key field
class Patient(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Symptoms(models.Model):
    # we define the patient to be a primary key, as each patient is associated with a unique set of symptoms
    # in this case, we do want to explictly define the primary key, as we are not using django's auto generated primary key, but the patients id'
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, null=True, blank= True)       # note that it is also a foreign key
    symptom_data = models.JSONField()  # Stores {"cough": 0, "fever": 1}

    def __str__(self):
        return f"Symptoms for {self.patient.name}"
