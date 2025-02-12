import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { CalendarProvider, Calendar, AgendaList } from "react-native-calendars";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../firebase/firebaseConfig"; // Import Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";
import { useStoreRootState } from "expo-router/build/global-state/router-store";

const ExpandableCalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState("2025-02-06");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "Appointments"));
        const querySnapshot = await getDocs(q);
        const fetchedAppointments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setAppointments(fetchedAppointments);
  
        // Generate markedDates dynamically
        const newMarkedDates = fetchedAppointments.reduce((acc, appointment) => {
          const date = appointment.date;
          if (!acc[date]) {
            acc[date] = { marked: true, dotColor: "red" };
          }
          return acc;
        }, {});
  
        // Ensure the selected date is still highlighted
        newMarkedDates[selectedDate] = {
          ...newMarkedDates[selectedDate],
          selected: true,
          selectedColor: "green",
          selectedTextColor: "white",
        };
  
        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
      setLoading(false);
    };
  
    fetchAppointments();
  }, [selectedDate]);
  
  

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  

  return (
    <CalendarProvider date={selectedDate}>
      <Calendar
        onDayPress={handleDayPress}
        style={styles.calendar}
        markedDates={markedDates}
        enableSwipeMonths={true}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: 'white',
          todayBackgroundColor: 'rgb(129, 163, 239)',
          dayTextColor: 'rgba(141, 141, 178, 0.86)',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'rgb(42, 42, 243)',
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Appointments</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : appointments.length > 0 ? (
          <AgendaList
            sections={[
              {
                title: selectedDate,
                data: appointments,
              },
            ]}
            renderItem={({ item }) => (
              <View style={styles.appointmentItem}>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.title}>{item.doctorName}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noAppointments}>No appointments</Text>
        )}
      </ScrollView>
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
    color: 'gray',
    textAlign: 'center'
  },
  appointmentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginLeft:10,
    marginRight:10,
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
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    width: 350,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    margin: 10,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default ExpandableCalendarScreen;
