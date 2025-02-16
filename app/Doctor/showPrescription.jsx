import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
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
    <ScrollView contentContainerStyle={{ flex:1}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 15 , alignSelf:'center'}}>Prescription Details</Text>

      {appointment && appointment.prescription ? (
        <View style={styles.container}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, marginLeft:5 }}>Medicines:</Text>
          {appointment.prescription.medicines.map((med, index) => (
           <View style={styles.medicine}>
             <Text key={index} style={{ fontSize: 18, color:'#ffffee', fontWeight:'bold' }}>
              • {med.name} - {med.dosage} - {med.frequency}
            </Text>
            </View>
          ))}

          {/* Display Doctor's Signature */}
          {appointment.prescription.signature ? (
            <View style={{ alignItems: "flex-start", marginTop: 20, marginLeft:5}}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Doctor's Signature:</Text>
              <Image
                source={{ uri: appointment.prescription.signature }}
                style={{
                  width: 150,
                  height: 120,
                  resizeMode: "contain",
                  marginTop: 10, 
                  alignSelf:'flex-start',
                  
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

const styles = StyleSheet.create({
  medicine:{
    padding:5, 
    margin:5,
    borderRadius:10,
    backgroundColor:'#b6dc76'
  }, 
  container:{
    backgroundColor:'rgb(243, 244, 226)',
    padding:10, 
    margin:20, 
    borderRadius:15, 
    elevation:5
  }
})
