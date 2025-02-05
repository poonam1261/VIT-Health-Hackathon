import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Symptom from "./Symptom";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { createStackNavigator } from "@react-navigation/stack";

//const Stack = createStackNavigator();

const SymptomScreen = () => {
  const navigation = useNavigation();
  const symptoms = [
    "Body pain", "Chills", "Confusion", "Cough", "Diarrhea", "Dizziness", "Fatigue",
    "Fever", "Headache", "Loss of appetite", "Migraines", "Nausea", "Weight gain", "Weight loss",  
  ];
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const updateSymptomSeverity = (symptom, severity) => {
    setSelectedSymptoms((prev) => {
      const updated = prev.filter((s) => s.name !== symptom);
      return [...updated, { name: symptom, severity }];
    });
  };


  const handleDone = async () => {
    try {
      await AsyncStorage.setItem("savedSymptoms", JSON.stringify(selectedSymptoms)); // Save to AsyncStorage
      navigation.navigate("Home"); // Navigate to the saved note page
    } catch (error) {
      console.error("Error saving symptoms:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleWrapper}>
        <Text style={styles.sectionTitle}>Today I feel...</Text>
      </View>

      {/* Scrollable Symptom List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {symptoms.map((symptom, index) => (
          <Symptom
            key={index}
            text={symptom}
            onUpdateSeverity={(severity) => updateSymptomSeverity(symptom, severity)}
          />
        ))}
      </ScrollView>

      {/* Done Button */}
      <View style={styles.doneButtonWrapper}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const SymptomStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="SymptomScreen" component={SymptomScreen} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// };

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
    backgroundColor: "#aea9cf",
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

//export default SymptomStack;
export default SymptomScreen;
