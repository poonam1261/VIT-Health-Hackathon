import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { db } from '../../firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

export default function PrescriptionsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Appointments"));

        const apptList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAppointments(apptList);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        All Prescriptions
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : appointments.length === 0 ? (
        <Text>No Appointments Found</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View >
              {/* Appointment Details */}
              {item.prescription && item.prescription.medicines.length > 0 ? (
                <View style={styles.card}>
              <Text style={styles.title}>{item.patientName}</Text>
              <Text style={styles.details}>Doctor: {item.doctorName}</Text>
              <Text style={styles.details}>Date: {item.date}</Text>
              <Text style={styles.details}>Time: {item.time}</Text>

              {/* Show Prescription Only If It Exists */}
             
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.prescriptionTitle}>Prescription:</Text>
                  {item.prescription.medicines.map((med, index) => (
                    <Text key={index} style={styles.medicineText}>
                      • {med.name} - {med.dosage} - {med.frequency}
                    </Text>
                  ))}

                  {/* Doctor's Signature */}
                  {item.prescription.signature ? (
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                      <Text style={styles.signatureTitle}>Doctor's Signature:</Text>
                      <Image
                        source={{ uri: item.prescription.signature }}
                        style={styles.signatureImage}
                      />
                    </View>
                  ) : null}

                  {/* View Full Prescription Button */}
                  <TouchableOpacity 
                    style={styles.button}
                    onPress={() => router.push({
                      pathname: '../Doctor/showPrescription',
                      params: { appointmentId: item.id }
                    })}
                  >
                    <Text style={styles.buttonText}>View Full Prescription</Text>
                  </TouchableOpacity>
                </View>
                </View>
              ) : null} 
            </View>
          )}
        />
      )}
    </View>
  );
}

// Styles
const styles = {
  card: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  details: {
    fontSize: 16,
    color: "#555"
  },
  prescriptionTitle: {
    fontWeight: "bold",
    marginTop: 10
  },
  medicineText: {
    fontSize: 16,
    color: "#333"
  },
  signatureTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5
  },
  signatureImage: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#000"
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
};

