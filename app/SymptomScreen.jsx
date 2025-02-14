import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Symptom from "./Symptom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase/firebaseConfig";
import { API_BASE_URL } from "../config";

const SymptomScreen = () => {
  const navigation = useNavigation();
  const symptoms = [
    "Body pain",
    "Chills",
    "Confusion",
    "Cough",
    "Diarrhea",
    "Dizziness",
    "Fatigue",
    "Fever",
    "Headache",
    "Loss of appetite",
    "Migraines",
    "Nausea",
    "Weight gain",
    "Weight loss",
  ];
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // Update symptom severity
  const updateSymptomSeverity = (symptom, severity) => {
    setSelectedSymptoms((prev) => {
      const updated = prev.filter((s) => s.name !== symptom);
      return [...updated, { name: symptom, severity }];
    });
  };

  // Handle "Done" button press
  const handleDone = async () => {
    try {
      const symptomsObject = selectedSymptoms.reduce((acc, symptom) => {
        acc[symptom.name] = symptom.severity;
        return acc;
      }, {});

      const payload = {
        patient: auth.currentUser.uid, // Fetch user ID from firebase
        patient: "1", // hardcoded value
        symptom_data: symptomsObject,
      };

      // Check if the patient already has a record
      const checkResponse = await fetch(
        `${API_BASE_URL}/api/symptoms/${payload.patient}`,
      );

      let response;
      if (checkResponse.status === 404) {
        response = await fetch(`${API_BASE_URL}/api/symptoms/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to create record: ${errorText}`);
        }
      } else if (checkResponse.ok) {
        response = await fetch(
          `${API_BASE_URL}/api/symptoms/${payload.patient}/`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update record: ${errorText}`);
        }
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server returned: ${text.substring(0, 100)}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      await AsyncStorage.setItem("savedSymptoms", JSON.stringify(payload));
      navigation.navigate("meddash");
    } catch (error) {
      console.error("Submission failed:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.sectionTitle}>Today I feel...</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {symptoms.map((symptom, index) => (
          <Symptom
            key={index}
            text={symptom}
            onUpdateSeverity={(severity) =>
              updateSymptomSeverity(symptom, severity)
            }
          />
        ))}
      </ScrollView>
      <View style={styles.doneButtonWrapper}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5ee",
  },
  titleWrapper: {
    padding: 20,
    backgroundColor: "#fff5ee",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#896978",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  doneButtonWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  doneButton: {
    backgroundColor: "#rgb(184, 158, 184)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  doneText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SymptomScreen;
