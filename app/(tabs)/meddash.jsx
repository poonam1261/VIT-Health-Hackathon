import React, { useState } from "react";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import Swiper from "react-native-deck-swiper";

export default function MedicationDashboard() {
  const initialSwipeMeds = [
    { id: 1, name: "Aspirin", dosage: "100mg", timing: "Morning" },
    { id: 2, name: "Metformin", dosage: "500mg", timing: "Evening" },
    { id: 3, name: "Vitamin D", dosage: "1000 IU", timing: "Afternoon" },
  ];

  const [swipeMeds, setSwipeMeds] = useState(initialSwipeMeds);
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    timing: "",
    frequency: "",
  });
  const [selectedDate, setSelectedDate] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isSwipeVisible, setisSwipeVisible] = useState(false);
  
  const ToggleSwipe=() =>{
    setisSwipeVisible(!isSwipeVisible)
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const addMedication = () => {
    if (newMed.name && newMed.dosage && newMed.timing && newMed.frequency) {
      setMedications([...medications, newMed]);
      setNewMed({ name: "", dosage: "", timing: "", frequency: "" });
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  const removeMedication = (name) => {
    setMedications(medications.filter((med) => med.name !== name));
  };

  const markDate = (day) => {
    setSelectedDate((prev) => ({
      ...prev,
      [day.dateString]: { selected: true, marked: true, selectedColor: "blue" },
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>MedDash</Text>
          </View>


          <TouchableOpacity onPress={ToggleSwipe} style={styles.calendarToggle}>
            <Text style={styles.calendarToggleText}>{isSwipeVisible ? "Hide Today's Medications ▲" : "Show Medication Calendar ▼"}</Text>
          </TouchableOpacity>

 {isSwipeVisible &&(
         
          <View style={{ right:10, height: 300, width: 300, marginBottom: 20,  }}>
            <Swiper
              cards={swipeMeds}
              renderCard={(med) => (
                <View style={styles.card}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDose}>{med.dosage}</Text>
                </View>
              )}
              stackSize={4}
              backgroundColor={"#fff"}
              cardVerticalMargin={0}
              disableTopSwipe={true}  // 🚫 Disable upward swipe
              disableBottomSwipe={true}
              onSwipedLeft={(index) => {
                // Add the swiped card back to the end of the stack
                setSwipeMeds((prevMeds) => [...prevMeds, prevMeds[index]]);
              
              }}
              
            />
          </View>
 )}
          
          <TouchableOpacity onPress={toggleCalendar} style={styles.calendarToggle}>
            <Text style={styles.calendarToggleText}>{isCalendarVisible ? "Hide Medication Calendar ▲" : "Show Medication Calendar ▼"}</Text>
          </TouchableOpacity>

          {isCalendarVisible && (
            <View style={styles.calendarContainer}>
              <Calendar
                style={styles.calendar}
                markedDates={selectedDate}
                onDayPress={markDate}
                theme={{ selectedDayBackgroundColor: "#4a90e2", todayTextColor: "red", arrowColor: "#4a90e2" }}
              />
            </View>
          )}

          <Modal visible={showModal} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  {selectedMed ? `${selectedMed.name} - ${selectedMed.dosage} (${selectedMed.timing})` : "No medication selected"}
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Input form */}
          <View style={styles.inputContainer}>
            <View>
              <MaterialCommunityIcons name="pill" size={24} color="black" style={styles.icon} />
              <TextInput
                placeholder="Medicine Name"
                value={newMed.name}
                onChangeText={(text) => setNewMed({ ...newMed, name: text })}
                style={[styles.inputf, { paddingLeft: 40 }]}
              />
            </View>
            <View>
              <AntDesign name="clockcircleo" size={24} color="black" style={styles.icon} />
              <TextInput
                placeholder="Dosage"
                value={newMed.dosage}
                onChangeText={(text) => setNewMed({ ...newMed, dosage: text })}
                style={[styles.inputf, { paddingLeft: 40 }]}
              />
            </View>
            <View>
              <AntDesign name="clockcircleo" size={24} color="black" style={styles.icon} />
              <TextInput
                placeholder="Timing"
                value={newMed.timing}
                onChangeText={(text) => setNewMed({ ...newMed, timing: text })}
                style={[styles.inputf, { paddingLeft: 40 }]}
              />
            </View>
            <View>
              <Entypo name="line-graph" size={24} color="black" style={styles.icon} />
              <TextInput
                placeholder="Frequency"
                value={newMed.frequency}
                onChangeText={(text) => setNewMed({ ...newMed, frequency: text })}
                style={[styles.inputf, { paddingLeft: 40 }]}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addMedication}>
            <Text style={styles.addButtonText}>Add Medication</Text>
          </TouchableOpacity>

        </View>
        <Text style={styles.subHeader}>All Medications</Text>
          <FlatList
            style={styles.listContainer}
            data={medications}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.medicationItem}>
                <TouchableOpacity onPress={() => { setSelectedMed(item); setShowModal(true); }}>
                  <Text style={styles.medText}>{item.name} - {item.dosage} ({item.timing})</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeMedication(item.name)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
      </ScrollView>
    </SafeAreaView>
  );
}


  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        flex: 1, 
        justifyContent: "center", 
        
      },
      header: {
        backgroundColor: "#829582",
        padding: 15,
        alignItems: "center",
        },
        headerText: {
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
        },
        content: {
          padding: 20,
        },
        inputContainer: {
          marginBottom: 10,    
        },
        inputf:{
          marginLeft:10,
          marginRight:10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          
        },
        input: {  
          marginLeft:10,
          marginRight:10,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 1,
          borderRadius: 5,
        
        },
        addButton: {
          backgroundColor: "rgb(184, 158, 184)",
          padding: 20,
          borderRadius: 14,
          marginLeft:20,
          marginRight:20,
          alignItems: "center",
        },
        addButtonText: {
          color: "#fff",
          fontWeight: "bold",
        },
        subHeader: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        },
        
        medicationItem: {
          backgroundColor:'rgb(244, 227, 182)',
          marginLeft:10,
          marginRight:10,
          borderRadius:15,
          paddingBottom:20, 
          marginBottom:10
        },
        medText: {
          fontSize: 20,
          marginRight:6,
          color:'white',
        marginLeft:10,
      },
      actions: {
      
        gap: 10,
        marginRight:20,
        alignSelf:'flex-start'
      
      },
      removeText: {
        color: "red",
        
      },
      status: {
        color: "green",
      },
      button: {
        backgroundColor: "#4a90e2",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        marginLeft:0,
        marginRight:300,
        alignItems: "left",
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
      },
      modalText: {
        fontSize: 18,
        marginBottom: 10,
      },
      closeButton: {
        marginTop: 10,
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
      },
      closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
      },
      calendarToggle: {
        backgroundColor: "rgb(184, 158, 184)",
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 20,
        alignItems: "center",
        marginBottom: 10,
        marginTop:10,
      },
      calendarToggleText: {
        color: "#fff",
        fontWeight: "bold",
      },
      
      gifContainer: {
        alignItems: "center", 
        justifyContent: "center",
        marginVertical: 10,
      },
      

      
      gifButton: {
        width: 200,
        height: 200,
        marginRight: 10, // Spacing between GIF and text
      },
      
      reminderText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4a5568", // Dark gray for readability
      },
    listContainer: {
      flex:1,
      minHeight: 200, // Ensures it doesn't shrink and overlap
      marginBottom: 10,
       // Space from bottom
    },
    card: {
      width: 200,
  height: 250,
  justifyContent: "center", // Ensure content is centered properly
  alignItems: "center",
  backgroundColor: "#fff",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 5,
  position: "relative"
      
    },
    medName: { fontSize: 14, fontWeight: "bold" },
    medDose: { fontSize: 12, color: "#666" },
    icon: {
     top:30,
     left:20,
    }


    });
