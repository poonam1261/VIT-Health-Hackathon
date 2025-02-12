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

export default function MedicationDashboard() {
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({ name: "", dosage: "", timing: "", frequency: "" });
  const [selectedDate, setSelectedDate] = useState({});
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
          style={styles.input}
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
       {/* GIF Button for Navigation */}
       <TouchableOpacity style={styles.gifButton} onPress={() => navigation.navigate("MedicationDetails")}>
       <Image
        source={require("../../assets/animations/happy_blob.gif")}  // Local GIF
        style={{ width: 200, height: 200 }}
        contentFit="contain"
      />

      </TouchableOpacity>

      {/* Calendar */}
      <Text style={styles.subHeader}>Medication Calendar</Text>
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
      <FlatList
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
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f8f8",
    },
    header: {
      backgroundColor: "#ae887b",
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
        backgroundColor: '#d3d3o3',
    
      },
      input: {
        
        marginLeft:10,
        marginRight:10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        
      
      },
      addButton: {
        backgroundColor: "#4a90e2",
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
    calendarContainer: {
      marginVertical: 10, // Adjusts spacing
      paddingHorizontal: 10, // Adjusts left and right spacing
      
    },
    calendar: {
      width: "100%", // Change width as needed
      height: 300, // Adjust height to your preference
      alignSelf: "left", // Centers it
      borderRadius: 10, // Optional rounded corners
       // Adds shadow on Android
    },
  gifButton: {
     alignItems: "center",
     marginVertical: 10 
    },
  gif: { 
    width: 100, 
    height: 100 
  },
  gifButtonText: { 
    marginTop: 5, 
    fontWeight: "bold", 
    color: "#4a90e2" 
  },

  });