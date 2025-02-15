import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../../firebase/firebaseConfig'; // Ensure correct path
import { doc, getDoc } from 'firebase/firestore';

export default function ShowPrescription() {
  const { appointmentId } = useLocalSearchParams(); // Extract appointment ID
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId) {
        console.error("No appointment ID provided");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "Appointments", appointmentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAppointment({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No appointment found with this ID");
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Prescription Details</Text>

      {appointment && appointment.prescription ? (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Medicines:</Text>
          {appointment.prescription.medicines.map((med, index) => (
            <Text key={index} style={{ fontSize: 16 }}>
              • {med.name} - {med.dosage} - {med.frequency}
            </Text>
          ))}

          {/* Display Doctor's Signature */}
          {appointment.prescription.signature ? (
            <View style={{ alignItems: "center", marginTop: 20 , flexDirection:'row'}}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Doctor's Signature:</Text>
              <Image
                source={{ uri: appointment.prescription.signature }}
                style={{
                  width: '100',
                  height: 80,
                  resizeMode: "contain",
                  borderColor: "#000",
                  marginTop: 10, 
                  alignSelf:'center',
                  borderRadius:15
                }}
              />
            </View>
          ) : (
            <Text style={{ color: "red", marginTop: 10 }}>No Signature Provided</Text>
          )}
        </View>
      ) : (
        <Text style={{ color: "red", fontSize: 18 }}>No Prescription Available</Text>
      )}
    </ScrollView>
  );
}
