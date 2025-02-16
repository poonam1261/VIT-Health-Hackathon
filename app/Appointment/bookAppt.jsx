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

    

     Alert.alert(
          "Confirm Appointment",
          "Are you sure you want to confirm this appointment?",
          [
            {
              text: "Cancel",
              style: "cancel", // Does nothing, just closes the alert
            },
            {
              text: "Yes, Confirm",
              style: "destructive", // Red button for dangerous actions
              onPress: async () => {
                try {
                  const q = query(
                    collection(db, "Appointments"),
                    where("date", "==", selectedDate),
                    where("time", "==", slot.time) 
                  );
                  
                  const querySnapshot = await getDocs(q);
                  
                  if (!querySnapshot.empty) {
                    alert("You already have an Appointment booked for this Slot");
                    return;
                  }
                  
                
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

                    router.push('../survey')
                 
                } catch (error) {
                  console.error("Error bookign the appointment:", error);
                  Alert.alert("Error", "Failed to book the appointment.");
                }
              },
            },
          ],
        );
    
    

    
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
  {defaultSlots.map((slot) => (
    <View key={slot.id} style={styles.slotRow}>
      <TouchableOpacity
        style={[
          styles.slot,
          bookedSlots.includes(slot.time) ? styles.bookedslot : null, // Gray for booked slots
          selectedSlot === slot.time && !bookedSlots.includes(slot.time) && styles.selectedSlot, // Dark for selected slot
        ]}
        onPress={() => {
          if (!bookedSlots.includes(slot.time)) {
            setSelectedSlot(slot.time);
          } else {
            Alert.alert("Slot Unavailable", "This slot is already booked.");
          }
        }}
      >
        <Text style={styles.slotText}>{slot.time}</Text>
      </TouchableOpacity>

      {/* Show booking button only for available and selected slots */}
      {selectedSlot === slot.time && !bookedSlots.includes(slot.time) && (
        <TouchableOpacity style={styles.bookButton} onPress={() => handleBookSlot(slot)}>
          <FontAwesome6 name="check-circle" size={28} color="#E34F67" />
        </TouchableOpacity>
      )}
    </View>
  ))}
</View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slotRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "80%",
},

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
  bookedslot: {
    width: "80%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.2)",
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
    padding: 10,
    borderRadius: 8,    flexDirection:'row', 
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
    // fontSize: 20,
    // fontWeight: 'bold',
    // marginTop: 15,
    // marginBottom: 15,
    // borderRadius:10,
    // padding:10,
    // backgroundColor:'#5b4d54',
    // color:'white', 
    // justifyContent:'center'
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
});

export default BookAppt;
