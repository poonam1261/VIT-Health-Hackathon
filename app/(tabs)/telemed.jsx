import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import Foundation from "@expo/vector-icons/Foundation";
import { db } from "../../firebase/firebaseConfig";
import {
  getDocs,
  collection,
  where,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
export default function TeleMed() {
  const [modalVisible, setModalVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const today = new Date();
  const defaultDate = today.toISOString().split("T")[0];
  const doctors2 = [
    { name: "Dr. Sneha Verma", specialty: "Endocrinologist (Diabetes)" },
    {
      name: "Dr. Arjun Mehta",
      specialty: "Pulmonologist (Chronic Respiratory Diseases)",
    },
    {
      name: "Dr. Priya Sharma",
      specialty: "Nephrologist (Chronic Kidney Disease)",
    },
    {
      name: "Dr. Karan Kapoor",
      specialty: "Rheumatologist (Arthritis & Autoimmune Disorders)",
    },
    { name: "Dr. Neha Joshi", specialty: "Oncologist (Cancer Specialist)" },
    {
      name: "Dr. Vikram Rao",
      specialty: "Gastroenterologist (Chronic Liver Disease)",
    },
    {
      name: "Dr. Ananya Iyer",
      specialty: "Neurologist (Alzheimer's & Parkinson’s)",
    },
    {
      name: "Dr. Sameer Malhotra",
      specialty: "Psychiatrist (Chronic Mental Illness)",
    },
    {
      name: "Dr. Riya Desai",
      specialty: "Geriatrician (Age-related Chronic Conditions)",
    },
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAppts();
    }, []),
  );
  const handleDeleteAppt = async (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this appointment?",
      [
        {
          text: "Cancel",
          style: "cancel", // Does nothing, just closes the alert
        },
        {
          text: "Yes, Delete",
          style: "destructive", // Red button for dangerous actions
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "Appointments", id)); // Delete the document
              Alert.alert("Success", "Appointment deleted successfully!");
              fetchAppts(); // Refresh the list
            } catch (error) {
              console.error("Error deleting appointment:", error);
              Alert.alert("Error", "Failed to delete the appointment.");
            }
          },
        },
      ],
    );
  };

  const fetchDoctors = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Doctors"));
      setDoctors(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
      console.log("Doctors:", doctors);
      return appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchAppts = async () => {
    try {
      const q = query(
        collection(db, "Appointments"),
        where("date", ">=", defaultDate),
        orderBy("date", "asc"),
      );
      const snapshot = await getDocs(q);
      const fetchedAppointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(fetchedAppointments);
      console.log("Appointments:", fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    }
  };

  const handleApptPress = (item) => {
    Alert.alert("Meeting Link", "https://meet.google.com/hjh-avns-qeq");
  };

  const Item = ({ item }) => (
    <View style={styles.doctorContainer}>
      <View style={styles.doctorItem}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <FontAwesome6
            name="user-doctor"
            size={50}
            color="white"
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.doctorName} numberOfLines={2}>
            {item.name.startsWith("Dr.") && item.name.includes(" ")
              ? item.name.split(" ").slice(0, 2).join(" ") +
                "\n" +
                item.name.split(" ").slice(2).join(" ")
              : item.name}
          </Text>
        </View>
        <Text style={styles.doctorQual}>{item.qual}</Text>
      </View>
      <TouchableOpacity style={styles.bookApt}>
        <Text
          style={{ color: "white", fontWeight: "bold" }}
          onPress={() => {
            handleBookApt(item);
          }}
        >
          Book an Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );

  const AptItem = ({ item }) => (
    <TouchableOpacity style={styles.AptContainer} onPress={handleApptPress}>
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
        <Text style={styles.doctorNameApt}>{item.doctorName}</Text>
        <TouchableOpacity
          style={styles.cancelAppt}
          onPress={() => handleDeleteAppt(item.id)}
        >
          <Text>Cancel Appointment</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const router = useRouter();

  const handleBookApt = (doctor) => {
    router.push({
      pathname: "../Appointment/bookAppt",
      params: {
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorQual: doctor.qual,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.headerText}>Tele Medicine</Text>
            </View>

            <View style={styles.message}>
              <Image
                source={require("../../assets/images/doctorImg.png")}
                style={styles.doctorImg}
              />
              <Text style={styles.messageText}>
                Hi John, how are you feeling?
              </Text>
            </View>

            <TouchableOpacity
              style={styles.survey}
              onPress={() => router.push("survey")}
              // testing: onPress={() => router.push("SymptomScreen")}
            >
              <Text style={styles.surveyText}>Take Up Medical Survey</Text>
              <Feather name="arrow-right-circle" size={30} color="white" />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.aptHead}>Scheduled Appointments</Text>
              <Foundation
                name="calendar"
                size={45}
                color="#5b4d54"
                style={styles.calendarIcon}
                onPress={() =>
                  router.push({
                    pathname: "../calendar/calendarApp",
                    params: { appointments: JSON.stringify(appointments) },
                  })
                }
              />
            </View>
          </>
        }
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AptItem item={item} />}
        ListFooterComponent={
          <>
            <Text style={styles.aptHead}>Book Appointment</Text>
            <FlatList
              data={doctors}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Item item={item} />}
            />
          </>
        }
        contentContainerStyle={{ paddingBottom: 20 }} // Prevent bottom cutoff
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFBFCC",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
  },
  message: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    borderWidth: 4,
    margin: 10,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "rgba(255, 255, 255, 0.55)",
    marginTop: 15,
    elevation: 20,
    backgroundColor: "#8c7a92",
  },
  messageText: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(255,255,255, 0.7)",
    marginLeft: 10,
  },
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
    marginLeft: 10,
    marginRight: 10,
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
  cancelAppt: {
    backgroundColor: "rgba(240, 8, 8, 0.14)",
    marginRight: 10,
    padding: 5,
    borderRadius: 8,
  },
});
