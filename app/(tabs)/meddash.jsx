import React, { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MedDash from "../calendar"
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from "expo-linear-gradient";
import{
  Button,
  Image,
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
import { hasJSDocParameterTags } from "typescript";
import YourComponent from "../graph";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";

export default function MedicationDashboard() {
  LogBox.ignoreAllLogs(); // Hides all warnings

  const navigation = useNavigation();

  const Harcoded=
  [
    
      { id: 6, name: "Lisinopril", dosage: "10mg", timing: "8:00 AM", frequency: "Once daily" },
      { id: 7, name: "Atorvastatin", dosage: "20mg", timing: "10:00 PM", frequency: "Once daily" },
      { id: 8, name: "Metformin", dosage: "500mg", timing: "8:00 AM and 8:00 PM", frequency: "Twice daily" }
    ];
    
  const initialSwipeMeds = 
    [
      { id: 1, name: "Paracetamol", dosage: "500mg", timing: "As needed for pain" },
      { id: 2, name: "Amoxicillin", dosage: "250mg", timing: "Every 8 hours" },
      { id: 3, name: "Vitamin C", dosage: "1000mg", timing: "Once a day" },
      { id: 4, name: "Ibuprofen", dosage: "200mg", timing: "Every 6 hours as needed for pain" },
      { id: 5, name: "Antacid", dosage: "10ml", timing: "As needed for heartburn or indigestion" }
    ]
  const [modalVisible, setModalVisible] = useState(false);
  const [swipeMeds, setSwipeMeds] = useState(initialSwipeMeds);
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    timing: "",
    frequency: "",
    StartDate:"",
    EndDate:""
  });
  const [selectedDate, setSelectedDate] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isSwipeVisible, setisSwipeVisible] = useState(false);
  const totalMedications = initialSwipeMeds.length;
  const [medicationsTaken, setMedicationsTaken] = useState(0);
  



  const handleSave = () => {
        setModalVisible(false); // Close modal after saving

    setMedications([...medications, newMed]);
    setNewMed({ name: "", dosage: "", timing: "", frequency: "" , StartDate:"", EndDate:""});
  
  };
  
  const ToggleSwipe=() =>{
    setisSwipeVisible(!isSwipeVisible)
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const addMedication = () => {
     setModalVisible(true);
  
  };

  const removeMedication = (name) => {
    setMedications(medications.filter((med) => med.name !== name));
  };

  const markDate = (day) => {
    setSelectedDate((prev) => ({
      ...prev,
      [day.dateString]: { selected: true, marked: true, selectedColor: "grey" },
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>MedDash</Text>
          </View>

          
            <View >
  <YourComponent/>
  </View>

<MedDash/>

          <TouchableOpacity onPress={ToggleSwipe} style={styles.calendarToggle}>
            <Text style={styles.calendarToggleText}>{isSwipeVisible ? "Hide Today's Medications ▲" : "Show Medications ▼"}</Text>
          </TouchableOpacity>


          {isSwipeVisible && (
           
  <View style={{ height: 250,  flexDirection: "row",  justifyContent: "space-between", marginBottom: 20, marginTop: 10  }}>
    
    {/* Swiper Container */}
    
    <View style={{ left: 2 ,alignItems:"left" }}>
    
  <Swiper
    cards={swipeMeds}
    renderCard={(med) => (
      <LinearGradient colors={['#FFF0F3', '#F8EDEB']} style={styles.card}>
        <View style={styles.cardContent}>
          {/* Medicine Name */}
          <Text style={styles.medName}>
            💊 {med.name}
          </Text>

          {/* Dosage */}
          <Text style={styles.medDose}>
            💉 {med.dosage}
          </Text>

         Timing
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={18} color="#D81B60" />
          <Text style={styles.medTime}>
            {med.timing}
          </Text>
        </View>
      </View> 
      </LinearGradient>
    )}
    stackSize={4}
    cardVerticalMargin={0}
    disableTopSwipe={true}
    disableBottomSwipe={true}
    onSwipedRight={() => setMedicationsTaken((prev) => prev + 1)}
    onSwipedLeft={(index) =>
      setSwipeMeds((prevMeds) => [...prevMeds, prevMeds[index]])
    }
  />
</View>

   
    <View style={{  marginRight: 10,marginLeft:5 }}>
    <View style={{
    backgroundColor: "#FCE4EC", // Soft pink pastel
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  }}>
    
    {/* Circular Progress */}
    <CircularProgress
      value={(medicationsTaken / totalMedications) * 100}
      radius={73}
      strokeWidth={12}
      progressColor="#FF80AB" // Soft pastel pink
      activeStrokeColor="rgb(164, 90, 115)"
      inActiveStrokeColor="rgb(204, 169, 176)"
      progressLabelColor="black"
     
    />

    {/* Cute Stats Container */}
    <View style={{
      backgroundColor: "#FFEBEE", // Lighter pastel pink
      paddingVertical: 10,
      borderRadius: 15,
      marginTop: 20,
      marginBottom:5,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#D81B60", // Deep pink
      }}>
         
              Swipe Right if taken {'\n'}
              Swipe left to dismiss{'\n'}
              
        💊 {medicationsTaken} / {totalMedications} Medications Taken
      </Text>
    </View>

  </View>
</View>


  </View>
  
)}

<Modal visible={showModal} animationType="slide" transparent={true}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center', elevation: 5 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>
        {selectedMed ? `${selectedMed.name} - ${selectedMed.dosage}` : "No medication selected"}
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>
        {selectedMed ? `${selectedMed.timing} | Frequency: ${selectedMed.frequency}` : ""}
      </Text>
      
      <TouchableOpacity style={{ marginTop: 10, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'rgb(166, 193, 221)', borderRadius: 5 }} onPress={() => setShowModal(false)}>
        <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

            {/* Input form */}
            <View>
      {/* Add Medication Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Medication</Text>
      </TouchableOpacity>

      {/* Medication Input Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ width: '85%', backgroundColor: 'white', borderRadius: 10, padding: 20, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 3 }}>
      
      {/* Medicine Name */}
      <View style={{ marginBottom: 15 }}>
        <MaterialCommunityIcons name="pill" size={24} color="rgb(188, 204, 156)" style={{ position: 'absolute', left: 10, top: '50%', transform: [{ translateY: -12 }] }} />
        <TextInput
          placeholder="Medicine Name"
          value={newMed.name}
          onChangeText={(text) => setNewMed({ ...newMed, name: text })}
          style={{ height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, paddingHorizontal: 15, fontSize: 16, color: '#333', paddingLeft: 40 }}
        />
      </View>

      {/* Dosage */}
      <View style={{ marginBottom: 15 }}>
        <AntDesign name="medicinebox"  size={24} color="rgb(188, 204, 156)" style={{ position: 'absolute', left: 10, top: '50%', transform: [{ translateY: -12 }] }} />
        <TextInput
          placeholder="Dosage"
          value={newMed.dosage}
          onChangeText={(text) => setNewMed({ ...newMed, dosage: text })}
          style={{ height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, paddingHorizontal: 15, fontSize: 16, color: '#333', paddingLeft: 40 }}
        />
      </View>

      {/* Timing */}
      <View style={{ marginBottom: 15 }}>
        <AntDesign name="clockcircleo" size={24} color="rgb(188, 204, 156)" style={{ position: 'absolute', left: 10, top: '50%', transform: [{ translateY: -12 }] }} />
        <TextInput
          placeholder="Timing"
          value={newMed.timing}
          onChangeText={(text) => setNewMed({ ...newMed, timing: text })}
          style={{ height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, paddingHorizontal: 15, fontSize: 16, color: '#333', paddingLeft: 40 }}
        />
      </View>

      {/* Frequency */}
      <View style={{ marginBottom: 15 }}>
        <Entypo name="line-graph" size={24} color="rgb(188, 204, 156)" style={{ position: 'absolute', left: 10, top: '50%', transform: [{ translateY: -12 }] }} />
        <TextInput
          placeholder="Frequency"
          value={newMed.frequency}
          onChangeText={(text) => setNewMed({ ...newMed, frequency: text })}
          style={{ height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, paddingHorizontal: 15, fontSize: 16, color: '#333', paddingLeft: 40 }}
        />
      </View>

      {/* Save & Cancel Buttons */}
      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Cancel" onPress={() => setModalVisible(false)} color="#D8BFD8" />
        <Button title="Save" onPress={handleSave} color="rgb(237, 234, 147)" />
      </View>

    </View>
  </View>
</Modal>

  
    </View>
  
        </View>
      
             <View 
             style={{
               backgroundColor: '#FFF9C4', // Soft pastel yellow background
               padding:5,
               marginRight:10,
               borderRadius: 25,
               marginVertical: 10,
               alignItems: 'center',
               justifyContent: 'center',
               shadowColor: '#000', // Shadow effect
               shadowOpacity: 0.1,
               shadowRadius: 10,
               elevation: 5,
             }}
             >
             <Text style={{fontSize: 20, fontWeight: "bold", color: "#6B6B6B", textAlign: "center", marginBottom: 20}}>All medications</Text>
       
             </View>
        <View style={styles.listContainer}>
        <FlatList
      style={styles.listContainer}
      data={Harcoded} // Keeping the original list static
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.medicationItem}>
      <TouchableOpacity onPress={() => { setSelectedMed(item); setShowModal(true); }}>
        <View style={styles.medCard}>
          <View style={styles.medInfo}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text style={styles.medDosage}>{item.dosage}</Text>
            <Text style={styles.medTiming}>{item.timing}</Text>
          </View>
          <TouchableOpacity onPress={() => removeMedication(item.name)} style={styles.removeButton}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
      )}
    />
<FlatList
  
  data={medications}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.medicationItem}>
      <TouchableOpacity onPress={() => { setSelectedMed(item); setShowModal(true); }}>
        <View style={styles.medCard}>
          <View style={styles.medInfo}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text style={styles.medDosage}>{item.dosage}</Text>
            <Text style={styles.medTiming}>{item.timing}</Text>
          </View>
          <TouchableOpacity onPress={() => removeMedication(item.name)} style={styles.removeButton}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  )}
/>


        </View>
       
      </ScrollView>
      <TouchableOpacity style={styles.pharmacyButton} onPress={() => navigation.navigate("pharmacyInt/pharmacy")}>
        <Text style={styles.pharmacyButtonText}>Find Nearby Pharmacies</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


  const styles = StyleSheet.create({
    placeholderContainer: {
      backgroundColor: "#FFEDF3",
      marginTop:15,  // Soft pastel pink
      padding: 15,
      height:250,
      borderRadius: 10,
      marginHorizontal: 20,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,  // Adds a shadow
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 1, height: 2 },
    },
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
          backgroundColor:"#fff"  
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
        
      actions: {
      
        gap: 10,
        marginRight:20,
        alignSelf:'flex-start'
      
      },
  
        medCard: {
          backgroundColor: "#f8f9fa",
          padding: 12,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          elevation: 3, // Shadow effect
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        medInfo: {
          flexDirection: "column",
          flex: 1, // Allow name and details to take space
        },
        medName: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#333",
        },
        medDosage: {
          fontSize: 14,
          color: "#666",
        },
        medTiming: {
          fontSize: 14,
          color: "#007bff",
          fontWeight: "bold",
        },
        removeButton: {
          backgroundColor: "rgb(206, 98, 98)",
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 8,
        },
        removeText: {
          fontSize: 14,
          fontWeight: "bold",
          color: "#fff",
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
      modalOverlay: {
        flex: 1,
        marginTop:100,
        padding:20,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // Dim background effect
      },
      modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        width: "80%", // Compact width
        maxHeight: "90%", // Prevent full-screen flexing
        elevation: 5, // Shadow effect
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
        flex: 1,
        height:"10%",
        
        padding: 15, // Adds some space
      },
      calendar: {
        width: "97%", // Responsive width
        maxWidth: 400, // Prevents it from stretching too much
        height: 350, // Give it a proper height
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 5, // Shadow for better visibility
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
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
      width: 180,
      height: 200,
      
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
      position: "absolute", // Allows cards to stack on top of each other
      borderRadius: 10,
    
    },
    dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10, // Adds spacing between Start & End Date
  },
    dateInputWrapper: {
      flex: 1, // Each date input takes equal space
    },
    dateInput: {
      width: "100%", // Ensures it scales properly
    },
    cardContent: {
      alignItems: "center",
      gap: 8,
    },
    medName: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#D81B60",
    },
    medDose: {
      fontSize: 16,
      fontWeight: "600",
      color: "#A45A73",
    },
    medTime: {
      fontSize: 16,
      fontWeight: "500",
      color: "#5D4157",
      marginLeft: 6,
    },
    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FCE4EC",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    icon: {
     top:30,
     left:20,
    },
    pharmacyButton: {
      backgroundColor: "#b89eb8",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 10,
      position: 'absolute',
      bottom: 20,
      left: 20,
      width: '45%', // Slightly less than half to account for margins
      elevation: 5, // For Android shadow
      shadowColor: '#000', // For iOS shadow
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    pharmacyButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },


    });