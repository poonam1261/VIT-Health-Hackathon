import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { db } from '../../firebase/firebaseConfig'; // Ensure correct path
import { Octicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DocAppts() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);   
  const [loading, setLoading] = useState(true);
  const name = "Dr. Sameer Malhotra"

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const q = query(collection(db, "Appointments"), where("doctorName", "==", name));
        const querySnapshot = await getDocs(q);

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

  const handleViewPres = (item) => {
    router.push({
      pathname: "./showPrescription",
      params: {
       appointmentId : item.id
      }
    });
  }

 

  const AptItem = ({ item }) => (
    <View style={styles.AptContainer} >
      <View style={styles.AptItem}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Octicons name="note" size={30} color="#5b4d54" />
          <Text style={styles.AptDate}>{item.date}</Text>
        </View>
        <Text style={styles.AptTime}>{item.time}</Text>
      </View>
      <View style={styles.seperator}></View>
      <View style={{ flexDirection: "row" }} justifyContent="space-between">
        <Text style={styles.doctorNameApt}>Mr. Raj Naik</Text>
        <TouchableOpacity
          style={styles.viewPres}
          onPress={() => handleViewPres(item)}
        >
          <Text>View Prescription</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
          style={styles.addPres}
          onPress={() => {router.push({
            pathname : './Prescription',
            params : {
              appointmentId : item.id
            }
          })}}
        >
          <AntDesign name="pluscircleo" size={24} color="black" />
          <Text>Add Prescription</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10,alignSelf:'center' }}>Your Appointments</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5b4d54" />
      ) : appointments.length === 0 ? (
        <Text>No Appointments Found</Text>
      ) : (   
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AptItem item={item} />}
          />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  doctorItem: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "600",
    marginRgiht: 10,
    color: "white",
    marginLeft: 20,
  },
  doctorNameApt: {
    fontSize: 17,
    fontWeight: "500",
    marginRgiht: 10,
    color: "black",
    marginLeft: 20,
  },
  doctorQual: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
    alignSelf: "flex-start",
  },
  doctorImg: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  doctorContainer: {
    backgroundColor: "#b6dc76",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    paddingBottom: 20,
    marginBottom: 10,
    elevation: 10,
  },
  bookApt: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    color: "white",
    fontSize: 15,
    position: "absolute",
    top: "60%",
    right: 4,
  },
  survey: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#a3a9cf",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  surveyText: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  aptHead: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(58, 22, 20, 0.74)",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#f0e1b9",
    alignSelf: "center",
    textAlign: "center",
    elevation: 10,
  },
  AptDate: {
    fontSize: 15,
    fontWeight: "bold",
    color: "rgba(26, 153, 17, 0.92)",
    marginLeft: 15,
  },
  AptItem: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,

    alignItems: "center",
  },
  AptContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 15,
    paddingBottom: 20,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 5,
    borderColor: "rgba(50, 66, 61, 0.91)",
  },
  AptTime: {
    fontSize: 15,
    fontWeight: "bold",
    color: "rgba(26, 153, 17, 0.92)",
  },
  calendarIcon: {
    position: "absolute",
    right: 0,
    marginRight: 20,
  },
  seperator: {
    width: "95%",
    height: 1,
    backgroundColor: "rgba(237, 103, 103, 0.87)",
    margin: 10,
  },
  viewPres: {
    backgroundColor: "rgba(240, 8, 8, 0.14)",
    marginRight: 10,
    padding: 5,
    borderRadius: 8,
  },
  addPres:{
    backgroundColor: "rgba(4, 8, 240, 0.14)",
    marginRight: 10,
    padding: 5,
    borderRadius: 8,
    width:150,
    alignSelf:'flex-end',
    marginTop:10, 
    flexDirection:'row', 
    justifyContent:'space-between',
    alignItems:'center'
  }

})
