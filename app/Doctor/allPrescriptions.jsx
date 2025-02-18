import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrescriptionsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      console.log("📢 Fetching appointments from Firestore...");

      try {
        const querySnapshot = await getDocs(collection(db, "Appointments"));

        console.log("📜 Documents fetched:", querySnapshot.size);

        if (querySnapshot.empty) {
          console.log("❌ No documents found in Firestore.");
        }

        const apptList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("✅ Appointments list:", apptList);
        setAppointments(apptList);
      } catch (error) {
        console.error("🔥 Error fetching appointments:", error);
        setError("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        All Prescriptions
      </Text>

      {console.log("🧐 Appointments:", appointments, "Loading:", loading)}

      {loading ? (
        <ActivityIndicator size="large" color="#5b4d54" />
      ) : error ? (
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      ) : appointments.length === 0 ? (
        <Text>No Appointments Found</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => {
            console.log("🔍 Rendering Item:", item);

            if (!item.prescription || !item.prescription.medicines) {
              console.log("🚨 No prescription found for:", item.patientName);
              return (
                <View style={styles.card}>
                  <Text style={styles.title}>{item.patientName}</Text>
                  <Text style={styles.details}>Doctor: {item.doctorName}</Text>
                  <Text style={styles.details}>Date: {item.date}</Text>
                  <Text style={styles.details}>Time: {item.time}</Text>
                  <Text style={{ color: 'red' }}>No Prescription Available</Text>
                </View>
              );
            }

            return (
              <View style={styles.card}>
                <Text style={styles.title}>{item.patientName}</Text>
                <Text style={styles.details}>Doctor: {item.doctorName}</Text>
                <Text style={styles.details}>Date: {item.date}</Text>
                <Text style={styles.details}>Time: {item.time}</Text>

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
            );
          }}
        />
      )}
    </SafeAreaView>
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
  button: {
    backgroundColor: "#8c7a92",
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