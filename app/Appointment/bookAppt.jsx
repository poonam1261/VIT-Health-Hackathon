import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExpandableCalendar, CalendarProvider, AgendaList } from "react-native-calendars";

const appointments = {
  "2025-02-06": [{ id: "1", hour: "10:00 AM", title: "Doctor Appointment" }],
  "2025-02-11": [
    { id: "2", hour: "9:00 AM", title: "Gym Session" },
    { id: "3", hour: "2:00 PM", title: "Business Meeting" },
  ],
};

const bookAppt = () => {
  const [selectedDate, setSelectedDate] = useState("2025-02-06");

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
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
      <ExpandableCalendar 
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
            <View style={styles.appointmentItem}>
              <Text style={styles.time}>{item.hour}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
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
