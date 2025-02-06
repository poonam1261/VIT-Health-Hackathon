import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarProvider, Calendar, AgendaList } from "react-native-calendars";
import { useLocalSearchParams } from "expo-router";

const ExpandableCalendarScreen = () => {
  const { appointments } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState("2025-02-06");

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // Mark selected date with a green circle
  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: "green",
      selectedTextColor: "white",
    },
  };

  // Get all appointments for the selected date
  const getAppointmentsForSelectedDate = () => {
    return appointments[selectedDate] || [];
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
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: 'white',
          todayBackgroundColor: 'rgb(129, 163, 239)',
          dayTextColor: 'rgba(141, 141, 178, 0.86)',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'rgb(42, 42, 243)',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Appointments on {selectedDate}:</Text>
        <AgendaList
          sections={[
            {
              title: selectedDate,
              data: getAppointmentsForSelectedDate(),
            },
          ]}
          renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
              <Text style={styles.time}>{item.time}</Text>
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
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    width: "350",
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
