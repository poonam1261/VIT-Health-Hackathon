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

// UPDATED: Use AsyncStorage (async) instead of localStorage
const updateScore = async (increment = 25) => {
  try {
    // Retrieve the existing score from AsyncStorage
    const scoreStr = await AsyncStorage.getItem("healthScore"); // <-- Using AsyncStorage.getItem instead of localStorage.getItem
    let score = scoreStr ? parseInt(scoreStr, 10) : 0;
    
    // Increment the score and ensure it doesn't exceed 75
    score = Math.min(score + increment, 75);
    
    // Save the updated score back to AsyncStorage
    await AsyncStorage.setItem("healthScore", score.toString()); // <-- Using AsyncStorage.setItem instead of localStorage.setItem
    
    return score;
  } catch (error) {
    console.error("Error updating score:", error);
    return 0;
  }
};

const SymptomScreen = () => {
  const navigation = useNavigation();
  const symptoms = [
    "Abdominal pain",
    "Anxiety",
    "Back pain",
    "Body pain",
    "Chills",
    "Cold sweats",
    "Confusion",
    "Constipation",
    "Cough",
    "Dehydration",
    "Diarrhea",
    "Dizziness",
    "Dry mouth",
    "Fatigue",
    "Fever",
    "Hair loss",
    "Headache",
    "Heartburn",
    "Irritability",
    "Itchy skin",
    "Joint pain",
    "Loss of appetite",
    "Migraines",
    "Mood swings",
    "Muscle cramps",
    "Nausea",
    "Night sweats",
    "Numbness",
    "Shortness of breath",
    "Skin rash",
    "Sore throat",
    "Sweating",
    "Vomiting",
    "Weakness",
    "Weight gain",
    "Weight loss"
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
        // patient: auth.currentUser.uid, // Fetch user ID from firebase              //comment this else peelu's mood doesnt get uplifted due to error
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
      //navigation.navigate("meddash");
      navigation.goBack();
    } catch (error) {
      console.error("Submission failed:", error);
      alert(`Error: ${error.message}`);
    }

      //window.location.reload();   forced refresh
      // Update the score (increment by 10 points for each submission)
      const updatedScore = updateScore(); // Update the score
      console.log("Updated Health Score:", updatedScore);
      //navigation.navigate("TeleMed");   //setup in navigator
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
    //fontWeight: "bold",
  },
});

export default SymptomScreen;
