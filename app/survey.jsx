// import { View, Text, TextInput } from 'react-native'
// import React, { useState } from 'react'
// import { Formik, useFormik } from 'formik'
// import { Picker, PickerIOS } from '@react-native-picker/picker';

// export default function survey() {

//   const [currency, setCurrency] = useState('US Dollar');
//   const formik = useFormik({
//     initialValues:{
//       email: '',
//     },
//     onSubmit: values => {
//       alert(JSON.stringify(values, null, 2));
//     },

//   });
//   return (
//     <View>
//       <Text> Demo Form</Text>
//       <View>
//         <TextInput
//         placeholder='Email'
//         underlineColorAndroid={'black'}/>
//         <TextInput
//         secureTextEntry={true}
//         placeholder='Password'
//         underlineColorAndroid={'black'}
//         />

        
        
       
//       </View>
//     </View>
//   )
// }


import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
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
    };


    console.log("Pre-Appointment Form Data:", formData);
    //ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  
    navigation.goBack();
  };

  const Navigate = () =>{
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

        {/*Type of appt*/}
        <Text style={styles.label}>Type of Appointment</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              apptType === "new" && styles.activeToggle,
            ]}
            onPress={() => setApptType("new")}
          >
            <Text style={styles.toggleText}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              apptType === "followUp" && styles.activeToggle,
            ]}
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
          placeholderTextColor={"gray"}
          value={reason}
          onChangeText={setReason}
        />

        {/* New/Existing Problem */}
        <Text style={styles.label}>Is this a new or existing problem?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              problemType === "new" && styles.activeToggle,
            ]}
            onPress={() => setProblemType("new")}
          >
            <Text style={styles.toggleText}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              problemType === "existing" && styles.activeToggle,
            ]}
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
          placeholderTextColor={"gray"}
        />

        {/* Food Interactions */}
        <Text style={styles.label}>Any new food interactions?</Text>
        <TextInput
          style={styles.input}
          placeholder="Any new food reactions? (Optional)"
          placeholderTextColor={"gray"}
          value={foodInteractions}
          onChangeText={setFoodInteractions}
        />

        {/* Medicine Interactions */}
        <Text style={styles.label}>Any new medicine interactions?</Text>
        <TextInput
          style={styles.input}
          placeholder="Any medicine reactions? (Optional)"
          placeholderTextColor={"gray"}
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

        {/*add symptoms*/}
        <Text style={styles.label}>Add Symptoms</Text>
        <TouchableOpacity style = {styles.doneButton} onPress={Navigate}>
          <Text style={styles.doneText}>Select Symptoms</Text>
        </TouchableOpacity>

        {symptomsAdded && (
        <Text style={styles.symptomsText}>
          Symptoms have been added successfully!
        </Text>
      )}

        {/* Other Observations */}
        <Text style={styles.label}>Other Observations</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Enter any unusual symptoms. (Optional)"
          placeholderTextColor={"gray"}
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
  container: {
    flex: 1,
    backgroundColor: "#fff5ee",
  },

  header: {
    paddingVertical: 15,
    backgroundColor: '#ae887b',
    alignItems: 'center',
    marginBottom: 5,
},

headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
},
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#rgba(58, 22, 20, 0.74)",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  symptomsText: {
    fontSize: 18,
    marginVertical: 5,
    color: "#ae897b",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
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
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 10,
  },
  sliderValue: {
    fontSize: 16,
    marginBottom: 15,
    color: "#ae897b",
  },
  doneButton: {
    backgroundColor: "#rgb(184, 158, 184)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  doneText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Survey;
