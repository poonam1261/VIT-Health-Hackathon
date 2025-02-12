import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { Image } from 'expo-image';
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native";

export default function MedicationDashboard() {
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({ name: "", dosage: "", timing: "", frequency: "" });
  const [selectedDate, setSelectedDate] = useState({});
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const addMedication = () => {
    if (newMed.name && newMed.dosage && newMed.timing && newMed.frequency) {
      setMedications([...medications, newMed]);
      setPrescriptionHistory([...prescriptionHistory, newMed]);
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

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MedDash</Text>
      </View>

      {/* Medication Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Medicine Name"
          value={newMed.name}
          onChangeText={(text) => setNewMed({ ...newMed, name: text })}
          style={styles.inputf}
          />
        <TextInput
          placeholder="Dosage"
          value={newMed.dosage}
          onChangeText={(text) => setNewMed({ ...newMed, dosage: text })}
          style={styles.input}
          />
        <TextInput
          placeholder="Timing"
          value={newMed.timing}
          onChangeText={(text) => setNewMed({ ...newMed, timing: text })}
          style={styles.input}
          />
        <TextInput
          placeholder="Frequency"
          value={newMed.frequency}
          onChangeText={(text) => setNewMed({ ...newMed, frequency: text })}
          style={styles.input}
        />
      </View>

      {/* Add Medication Button */}
      <TouchableOpacity style={styles.addButton} onPress={addMedication}>
        <Text style={styles.addButtonText}>Add Medication</Text>
      </TouchableOpacity>

      <View style={styles.gifContainer}>
  {/* GIF Button for Navigation */}
        <TouchableOpacity style={styles.reminderButton}>
          <Image 
            style={styles.gifButton} 
            source={require("../../assets/animations/happy_blob.gif")} // Local GIF
            contentFit="contain"
          />
          <Text style={styles.reminderText}>Hello Fren! 🌼{"\n"}Have you taken your meds today? ^_^</Text>
        </TouchableOpacity>
      </View>


     {/* Medication Calendar Dropdown Button */}
      <TouchableOpacity onPress={toggleCalendar} style={styles.calendarToggle}>
         <Text style={styles.calendarToggleText}>
            {isCalendarVisible ? "Hide Medication Calendar ▲" : "Show Medication Calendar ▼"}
               </Text>
      </TouchableOpacity>

{/* Conditionally Render the Calendar */}
{isCalendarVisible && (
  <View style={styles.calendarContainer}>
    <Calendar
      style={styles.calendar}
      markedDates={selectedDate}
      onDayPress={markDate}
      theme={{
        selectedDayBackgroundColor: "#4a90e2",
        todayTextColor: "red",
        arrowColor: "#4a90e2",
      }}
    />
  </View>
)}
      
      {/* Modal for Medication Details */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {selectedMed ? `${selectedMed.name} - ${selectedMed.dosage} (${selectedMed.timing})` : ""}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Medication List */}
      <Text style={styles.subHeader}>All Medications</Text>
      <FlatList style={styles.listContainer}
        nestedScrollEnabled={true}
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
      </View>
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
        marginBottom: 20,    
      },
      inputf:{
        marginLeft:10,
        marginRight:10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 4,
        borderRadius: 5,
        marginTop:10
      },
      input: {  
        marginLeft:10,
        marginRight:10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 4,
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
        backgroundColor:'#b6dc76',
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
    
    reminderButton: {
      flexDirection: "row", // Keeps GIF & text side by side
      alignItems: "center",
      backgroundColor: "#fef3c7", // Soft pastel background
      padding: 12,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // For Android shadow
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
    flex: 1,
    minHeight: 200, // Ensures it doesn't shrink and overlap
    marginBottom: 20, // Space from bottom
  }

  });