import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExpandableCalendar, Calendar, CalendarProvider, AgendaList } from "react-native-calendars";

const appointments = {
  "2025-02-06": [{ id: "1", hour: "10:00 AM", title: "Doctor Appointment" }],
  "2025-02-07": [
    { id: "2", hour: "9:00 AM", title: "Gym Session" },
    { id: "3", hour: "2:00 PM", title: "Business Meeting" },
  ],
};

const ExpandableCalendarScreen = () => {
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



  return (
    <CalendarProvider date={selectedDate}>
      

<Calendar
onDayPress={handleDayPress}
style={{
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius:20,
  width:'350',
  paddingLeft:20,
  paddingRight:20, 
  paddingBottom:50 ,
  margin:10, 
  margintop:20,
  justifyContent:'center', 
  alignSelf:'center'
}}
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
    todayBackgroundColor:'rgb(129, 163, 239)',    dayTextColor: 'rgba(141, 141, 178, 0.86)',
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
    marginTop:10,
    'stylesheet.calendar.header':{
      dayTextAtIndex0:{
        color:'rgba(255, 0, 0, 0.55)'
      }
    }
  }} 

  
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

export default ExpandableCalendarScreen;
