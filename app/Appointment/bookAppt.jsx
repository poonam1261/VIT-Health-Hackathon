import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExpandableCalendar, CalendarProvider, AgendaList, Calendar } from "react-native-calendars";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig'

const appointments = {
  "2025-02-06": [{ id: "1", hour: "10:00 AM", title: "Doctor Appointment" }],
  "2025-02-11": [
    { id: "2", hour: "9:00 AM", title: "Available" },
    { id: "3", hour: "9:30 AM", title: "Not Available" },
    { id: "4", hour: "10:00 AM", title: "Available" },
    { id: "5", hour: "10:30 AM", title: "Available" },
  ],
  "2025-02-12": [
    { id: "10", hour: "9:00 AM", title: "Available" },
    { id: "11", hour: "9:30 AM", title: "Not Available" },
    { id: "12", hour: "10:00 AM", title: "Available" },
    { id: "13", hour: "10:30 AM", title: "Not Available" },
  ],
  "2025-02-13": [
    { id: "6", hour: "9:00 AM", title: " Not Available" },
    { id: "7", hour: "9:30 AM", title: "Not Available" },
    { id: "8", hour: "10:00 AM", title: "Available" },
    { id: "9", hour: "10:30 AM", title: "Available" },
  ],
};


const bookAppt = () => {
  const [selectedDate, setSelectedDate] = useState("2025-02-06");
  const [selectedApptId, setsectedApptId] = useState(null);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    fetchAppointments();
  }

  const handleApptPress = (item) => {
    setsectedApptId(item.id);
   { /*if(item.title === "Not Available"){
      alert("Slot is already booked")
    }
    item.title = "Appointment Booked"*/}
  }
  const getAppointmentStyle = (apptId) => ({
    backgroundColor: selectedApptId === apptId ? "#fef2e4" : "rgba(0,0,0,0.2)",
  });
 
   // const db = firestore();

   const fetchAppointments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Appointments"));
      const appointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Appointments:", appointments);
      return appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  
  

  // Mark selected date with a green circle
  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: "green", // Green circle around selected date
      selectedTextColor: "white",
    },
  };

  return (
    <CalendarProvider date={selectedDate}>
      <Calendar 
        onDayPress={handleDayPress}
        markedDates={markedDates} 
        hideArrows={false} 
        hideKnob={false} 
      />
      <View style={styles.container}>
        <Text style={styles.header}>Appointments on {selectedDate}:</Text>
        <AgendaList
          sections={[
            {
              title: selectedDate,
              data: appointments[selectedDate] || [],
            },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.appointmentItem , getAppointmentStyle(item.id)]} onPress={() => {handleApptPress(item)}}>
              <Text style={styles.time}>{item.hour}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        {(!appointments[selectedDate] || appointments[selectedDate].length === 0) && (
          <Text style={styles.noAppointments}>No appointments</Text>
        )}
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appointmentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor:'rgba(0,0,0,0.2)', 
    marginBottom:4
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    color: "#555",
  },
  noAppointments: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
});

export default bookAppt;
