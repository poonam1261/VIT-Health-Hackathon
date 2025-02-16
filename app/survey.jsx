import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import { useNavigation } from "@react-navigation/native";

const Survey = () => {
  const navigation = useNavigation();
  const [reason, setReason] = useState("");
  const [problemType, setProblemType] = useState("");
  const [apptType, setApptType] = useState("");
  const [symptomsAdded, setSymptomsAdded] = useState(false);

  const [duration, setDuration] = useState("");
  const [foodInteractions, setFoodInteractions] = useState("");
  const [medicineInteractions, setMedicineInteractions] = useState("");
  const [painScale, setPainScale] = useState(5);
  const [otherObservations, setOtherObservations] = useState("");
  const [symptomsStart, setSymptomsStart] = useState("");
  const[infection, setInfection] = useState("");
  const [bloodwork, setBloodwork] = useState('');
const [hbA1c, setHbA1c] = useState('');
const [fastingGlucose, setFastingGlucose] = useState('');
const [kidneyFunction, setKidneyFunction] = useState('');
const [lipidPanel, setLipidPanel] = useState('');
const [liverFunction, setLiverFunction] = useState('');
const [electrolytePanel, setElectrolytePanel] = useState('');
const [eyeExam, setEyeExam] = useState('');
const [footExam, setFootExam] = useState('');
const [heartHealth, setHeartHealth] = useState('');

  const handleSubmit = () => {
    const formData = {
      reason,
      problemType,
      apptType,
      duration,
      foodInteractions,
      medicineInteractions,
      painScale,
      otherObservations,
      symptomsStart,
      infection,
      bloodwork,
      hbA1c,
      fastingGlucose,
      kidneyFunction,
      lipidPanel,
      liverFunction,
      electrolytePanel,
      eyeExam,
      footExam,
      heartHealth

    };

    console.log("Pre-Appointment Form Data:", formData);
    navigation.goBack();
  };

  const Navigate = () => {
    navigation.navigate("SymptomScreen");
    setSymptomsAdded(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Pre-Appointment Details</Text>
        <Text style={styles.subtitle}>
          Please fill out the details before booking your appointment.
        </Text>

        {/* Type of Appointment */}
        <Text style={styles.label}>Type of Appointment</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, apptType === "new" && styles.activeToggle]}
            onPress={() => setApptType("new")}
          >
            <Text style={styles.toggleText}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, apptType === "followUp" && styles.activeToggle]}
            onPress={() => setApptType("followUp")}
          >
            <Text style={styles.toggleText}>Follow Up</Text>
          </TouchableOpacity>
        </View>

        {/* Reason for Visit */}
        <Text style={styles.label}>Reason for Visit</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the reason for your visit"
          placeholderTextColor="gray"
          value={reason}
          onChangeText={setReason}
        />

        {/* New/Existing Problem */}
        <Text style={styles.label}>Is this a new or existing problem?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, problemType === "new" && styles.activeToggle]}
            onPress={() => setProblemType("new")}
          >
            <Text style={styles.toggleText}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, problemType === "existing" && styles.activeToggle]}
            onPress={() => setProblemType("existing")}
          >
            <Text style={styles.toggleText}>Existing</Text>
          </TouchableOpacity>
        </View>

        {/* Duration of Symptoms */}
        <Text style={styles.label}>How long have you been experiencing symptoms?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 1 week, 3 days"
          value={duration}
          onChangeText={setDuration}
          placeholderTextColor="gray"
        />

        {/* Food Interactions */}
        <Text style={styles.label}>Any new food interactions?</Text>
        <TextInput
          style={styles.input}
          placeholder="Any new food reactions? (Optional)"
          placeholderTextColor="gray"
          value={foodInteractions}
          onChangeText={setFoodInteractions}
        />

        {/* Medicine Interactions */}
        <Text style={styles.label}>Any new medicine interactions?</Text>
        <TextInput
          style={styles.input}
          placeholder="Any medicine reactions? (Optional)"
          placeholderTextColor="gray"
          value={medicineInteractions}
          onChangeText={setMedicineInteractions}
        />

        {/* Pain Scale */}
        <Text style={styles.label}>Pain Scale</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={painScale}
          onValueChange={(value) => setPainScale(value)}
        />
        <Text style={styles.sliderValue}>Pain Level: {painScale}</Text>

        {/* Add Symptoms */}
        <Text style={styles.label}>Add Symptoms</Text>
        <TouchableOpacity style={styles.doneButton} onPress={Navigate}>
          <Text style={styles.doneText}>Select Symptoms</Text>
        </TouchableOpacity>

        {symptomsAdded && <Text style={styles.symptomsText}>Symptoms have been added successfully!</Text>}


        <Text style={styles.label}>When did these symptoms start? Are they getting worse?</Text>
        <TextInput
          style={styles.input}
          placeholder="eg 1 day, 1 week, etc."
          placeholderTextColor="gray"
          value={symptomsStart}
          onChangeText={setSymptomsStart}
        />

        <Text style={styles.label}>Have you had any recent infection?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter infection"
          placeholderTextColor="gray"
          value={infection}
          onChangeText={setInfection}
        />

<Text style={styles.label}>When was your last bloodwork done?</Text>
<TextInput
  style={styles.input}
  placeholder="Enter date and results"
  placeholderTextColor="gray"
  value={bloodwork}
  onChangeText={setBloodwork}
 />

<Text style={styles.label}>Have you had an HbA1c test recently?</Text>
<TextInput
  style={styles.input}
  placeholder="Enter details"
  placeholderTextColor="gray"
  value={hbA1c}
  onChangeText={setHbA1c}
/>

<Text style={styles.label}>Have you had a fasting blood glucose test?</Text>
<TextInput
  style={styles.input}
  placeholder="Enter details"
  placeholderTextColor="gray"
  value={fastingGlucose}
  onChangeText={setFastingGlucose}
/>

<Text style={styles.label}>Have you had your kidney function checked?</Text>
<TextInput
  style={styles.input}
  placeholder="BUN, creatinine, eGFR, urine albumin test"
  placeholderTextColor="gray"
  value={kidneyFunction}
  onChangeText={setKidneyFunction}
/>

<Text style={styles.label}>Have you had a lipid panel done?</Text>
<TextInput
  style={styles.input}
  placeholder="Cholesterol levels: LDL, HDL, triglycerides"
  placeholderTextColor="gray"
  value={lipidPanel}
  onChangeText={setLipidPanel}
/>

<Text style={styles.label}>Have you had liver function tests?</Text>
<TextInput
  style={styles.input}
  placeholder="Enter details"
  placeholderTextColor="gray"
  value={liverFunction}
  onChangeText={setLiverFunction}
/>

<Text style={styles.label}>Have you had an electrolyte panel?</Text>
<TextInput
  style={styles.input}
  placeholder="Enter details"
  placeholderTextColor="gray"
  value={electrolytePanel}
  onChangeText={setElectrolytePanel}
/>

<Text style={styles.label}>When was your last eye exam?</Text>
<TextInput
  style={styles.input}
  placeholder="Enter date or details"
  placeholderTextColor="gray"
  value={eyeExam}
  onChangeText={setEyeExam}
/>

<Text style={styles.label}>Have you had a foot exam recently?</Text>
<TextInput
  style={styles.input}
  placeholder="Any numbness, tingling, or wounds that won’t heal?"
  placeholderTextColor="gray"
  value={footExam}
  onChangeText={setFootExam}
/>

<Text style={styles.label}>Have you had a heart health screening?</Text>
<TextInput
  style={styles.input}
  placeholder="Enter details"
  placeholderTextColor="gray"
  value={heartHealth}
  onChangeText={setHeartHealth}
/>





        {/* Other Observations */}
        <Text style={styles.label}>Other Observations</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Enter any unusual symptoms. (Optional)"
          placeholderTextColor="gray"
          value={otherObservations}
          onChangeText={setOtherObservations}
          multiline={true}
        />

        {/* DONE Button */}
        <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
          <Text style={styles.doneText}>DONE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff5ee" },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#3A1614", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 20 },
  subheading: { fontSize: 20, fontWeight: "bold", color: "#3A1614", marginTop: 20, marginBottom: 5 },
  infoText: { fontSize: 16, color: "#AE897B", marginBottom: 10 },
  label: { fontSize: 18, marginBottom: 5, color: "#333" },
  input: { backgroundColor: "#f0f0f0", borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: "#ccc" },
  doneButton: { backgroundColor: "#B89EB8", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  doneText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  symptomsText:{
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "#rgb(184, 158, 184)",
  },

  toggleText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Survey;
