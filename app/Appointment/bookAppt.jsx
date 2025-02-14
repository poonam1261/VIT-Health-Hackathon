import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Calendar } from "react-native-calendars";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const defaultSlots = [
  { id: "1", time: "9:00 AM" },
  { id: "2", time: "9:30 AM" },
  { id: "3", time: "10:00 AM" },
  { id: "4", time: "10:30 AM" },
];

const BookAppt = () => {
  const { doctorId, doctorName, doctorQual } = useLocalSearchParams();
  const router = useRouter();
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const today = new Date();
  const defaultDate = today.toISOString().split('T')[0]; // Formats as "yyyy-mm-dd"
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  // Fetch booked slots from Firebase
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) {
        // Don't fetch appointments if no date is selected
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, "Appointments"));
        const booked = snapshot.docs
          .map((doc) => doc.data())
          .filter(
            (appt) => appt.doctorId === doctorId && appt.date === selectedDate
          )
          .map((appt) => appt.time);

        setBookedSlots(booked);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchBookedSlots();
  }, [doctorId, selectedDate]); // Depend on doctorId and selectedDate

  const handleBookSlot = async (slot) => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date before booking.");
      return;
    }

    try{if (!slot?.time) {
      alert("Invalid time slot selected.");
      return;
    } 

    
    const q = query(
      collection(db, "Appointments"),
      where("date", "==", selectedDate),
      where("time", "==", slot.time) 
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      alert("You already have an Appointment booked for this Slot");
      return;
    }}catch(error){
      console.error("Error booking appointment:", error);
    }
    
    try {
      // Add appointment with selected date and time to Firestore
      await addDoc(collection(db, "Appointments"), {
        doctorId,
        doctorName,
        time: slot.time,
        date: selectedDate,  // Include the selected date here
      });

      Alert.alert("Success", `Appointment booked at ${slot.time} on ${selectedDate} with ${doctorName}`);
      setBookedSlots([...bookedSlots, slot.time]);
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error booking appointment:", error);
      Alert.alert("Error", "Could not book appointment. Try again later.");
    }

    
  };

  const handleDayPress = (day) => {
    if(day.dateString >= defaultDate)
    setSelectedDate(day.dateString);
    else
   Alert.alert("Cannot select past dates");
    console.log(day.dateString);
  };

 

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: "blue",
      selectedTextColor: "white",
    },
  };

  return (
    <ScrollView  contentContainerStyle={styles.scrollContainer}>
<View style={styles.header}>
<Text style={styles.headerText}>Book Appointment with </Text>
<View style={{flexDirection:'row', justifyContent:'flex-start'}}>
  <Text style={styles.headerText} >{doctorName}</Text>
  <FontAwesome5 name="stethoscope" size={28} color="#84717A" />
</View>

</View>
      {/* Calendar with fixed height */}
      <View style={styles.calendarContainer}>
        <Calendar 
          onDayPress={handleDayPress}
          markedDates={markedDates}
        />
      </View>

      <Text style={styles.avlbappt}>Available Slots</Text>

      <View style={styles.slotContainer}>
        {defaultSlots.map((slot) =>
          bookedSlots.includes(slot.time) ? null : (
            <TouchableOpacity
              key={slot.id}
              style={[styles.slot, selectedSlot === slot.time && styles.selectedSlot, ]}
              onPress={() => setSelectedSlot(slot.time)}
            >
              <Text style={styles.slotText}>{slot.time}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {selectedSlot && (
        <TouchableOpacity style={styles.bookButton} onPress={() => handleBookSlot({ time: selectedSlot })}>
          <Text style={styles.bookButtonText}>Confirm Appointment</Text>
          <FontAwesome6 name="check-circle" size={24} color="white" />
        </TouchableOpacity>
      )}

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // This ensures ScrollView takes all available space when necessary
    alignItems: "center", // Align content inside ScrollView
    padding: 20,
  },
  header: {
    
    padding:10,
    borderRadius:20,
    borderWidth:3,
    borderColor:'#84717A'
    
  },
  headerText:{
    fontSize: 22,
    marginBottom: 10,
    fontWeight:'semibold',
    textAlign:'center',
    color:'black', 
    marginRight:5 , 
  },
  subHeader: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  calendarContainer: {
    height: 350, // Set a fixed height for the calendar
    width: "100%",
    marginBottom: 20,
  },
  slotContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  slot: {
    width: "80%",
    padding: 15,
    backgroundColor: "#C9EE76",
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedSlot: {
    backgroundColor: "#84717A",
  },
  slotText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#E34F67",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    flexDirection:'row', 
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight:10
  },
  backButton: {
    marginTop: 20,
    borderWidth:2,
    padding:5
  },
  backButtonText: {
    fontSize: 16,
    color: "blue",
  },
  avlbappt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    borderRadius:10,
    padding:10,
    backgroundColor:'#5b4d54',
    color:'white', 
    justifyContent:'center'
  },
});

export default BookAppt;
