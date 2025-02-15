import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Ensure correct path

const PrescriptionScreen = () => {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [signature, setSignature] = useState(null);
  const signatureRef = useRef();

  // Add Medicine to List
  const addMedicine = () => {
    if (medicineName && dosage && frequency) {
      setMedicines([...medicines, { name: medicineName, dosage, frequency }]);
      setMedicineName("");
      setDosage("");
      setFrequency("");
    } else {
      Alert.alert("Error", "Please enter all details!");
    }
  };

  // Capture Signature
  const handleOK = (sig) => {
    setSignature(sig);
  };

  const handleClear = () => {
    signatureRef.current.clearSignature(); // Clears the canvas
    setSignature(null); // Remove the stored signature preview
  };

  // Save Prescription (Store in AsyncStorage)
  const savePrescription = async (appointmentId) => {
    if (!appointmentId) {
      Alert.alert("Error", "Invalid appointment.");
      return;
    }
    
    if (medicines.length === 0) {
      Alert.alert("Error", "Please add medicines and sign the prescription!");
      return;
    }
  
    const prescriptionData = { medicines, signature };
  
    try {
      // Reference to the appointment document in Firestore
      const appointmentRef = doc(db, "Appointments", appointmentId);
  
      // Update Firestore document
      await updateDoc(appointmentRef, { prescription: prescriptionData });
  
      Alert.alert("Success", "Prescription saved!");
    } catch (error) {
      console.error("Error saving prescription:", error);
      Alert.alert("Error", "Failed to save prescription. Try again.");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Doctor's Virtual Prescription</Text>

      {/* Medicine Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Medicine Name"
          value={medicineName}
          onChangeText={setMedicineName}
          style={styles.input}
        />
        <TextInput
          placeholder="Dosage (e.g., 500mg)"
          value={dosage}
          onChangeText={setDosage}
          style={styles.input}
        />
        <TextInput
          placeholder="Frequency (e.g., 2 times/day)"
          value={frequency}
          onChangeText={setFrequency}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
          <Text style={styles.buttonText}>+ Add Medicine</Text>
        </TouchableOpacity>
      </View>

      {/* List of Medicines */}
      <FlatList
        data={medicines}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicineItem}>
            <Text style={styles.medicineText}>
              {item.name} - {item.dosage} - {item.frequency}
            </Text>
          </View>
        )}
      />

<Text style={styles.signatureTitle}>Doctor's Signature</Text>
      
      {/* Signature Canvas */}
      <SignatureScreen ref={signatureRef} onOK={handleOK} descriptionText="Sign here"   onEnd={() => signatureRef.current.readSignature()}  // Ensure signature is captured
      />

      {/* Show Signature Preview */}

      {/* Buttons: Save & Clear */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear Signature</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => {savePrescription("8Yzs4YgkTKcSOsf5XsP4")}}>
        <Text style={styles.buttonText}>Save Prescription</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  medicineItem: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
  },
  medicineText: {
    fontSize: 16,
  },
  signatureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  signatureImage: {
    width: 300,
    height: 100,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
});

export default PrescriptionScreen;
