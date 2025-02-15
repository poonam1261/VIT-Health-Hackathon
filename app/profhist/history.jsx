import { useState } from 'react';
//import { Link } from 'react-router-dom';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";


const historyPage = () => {
  const historyData = {
    name: "John Doe",
    age: "38",
    sex: "Male",
    blood: "O+",
    condition: "Diabetes-Type 2",
    doctor: "Dr. Doctor",
    childhood: "Acanthosis Nigricans",
    allergies: ["Hayfever", "latex"],
    complications: ["Diabetic Neuropathy", "Mild Retinopathy"],
    comorbidities: ["Hypertension", "Hyperlipidemia"],
  };

  const surgeries = {
    reason: ["Appendectomy", "Fractured wrist from a fall"],
    year: ["2005", "2015"],
    hospital: ["St. Mary's Hospital", "City General Hospital"],
  };

  const vaccinations = {
    name: [
      "BCG",
      "Hepatitis B (Birth Dose)",
      "DTP (Diphtheria, Tetanus, Pertussis)",
      "Polio",
      "MMR (Measles, Mumps, Rubella)",
      "Chickenpox",
      "Hepatitis A",
      "HPV (Human Papillomavirus)"
    ],
    date: [
      "1986-05-15", 
      "1986-05-20", 
      "1987-03-01", 
      "1987-03-01", 
      "1989-10-01", 
      "1995-03-10", 
      "1996-06-15", 
      "2002-09-01", 
    ],
  };

  const family = {
    father: "Type 2 Diabetes, Hypertension",
    mother: "Obesity",
    siblings: ["No known conditions"],
  };

  const lifestyle= {
    smoking: "Quit in 2015",
    alcohol: "Social drinker",
    activityLevel: "Sedentary",
    diet: "High-carb diet (pre-diagnosis), switched to low-carb in 2015",
  };

  const labResults = {
    test: ["HbA1c", "Fasting Blood Sugar", "Lipid Profile"],
    date: ["2024-12-01", "2024-12-01", "2024-12-01"],
    result: ["7.8%", "145mg/dL", "High LDL, Low HDL"]
  }
    
  const hospitalizations =
    {
      reason: "Diabetic Foot Ulcer (infection)",
      year: 2022,
      duration: "1 week",
      hospital: "City General Hospital",
    }
  

  const surgeriesData = surgeries.reason.map((reason, index) => ({
    reason,
    year: surgeries.year[index],
    hospital: surgeries.hospital[index],
  }));


  const vaccinationsData = vaccinations.name.map((name, index) => ({
    name,
    date: vaccinations.date[index],
  }));

  const labResultsData = labResults.test.map((test, index) => ({
    test,
    date: labResults.date[index],
    result: labResults.result[index],
  }));

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Medical History</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Name:</Text>
        <Text style = {styles.value}>{historyData.name}</Text>
        <Text style={styles.label}>Age:</Text>
        <Text style = {styles.value}>{historyData.age}</Text>
        <Text style={styles.label}>Sex:</Text>
        <Text style = {styles.value}>{historyData.sex}</Text>
        <Text style={styles.label}>Blood Type:</Text>
        <Text style = {styles.value}>{historyData.blood}</Text>

        {/*med detaiuws*/}
        <Text style={styles.subtitle}>Medical Details</Text>
        <Text style={styles.label}>Condition:</Text>
        <Text style = {styles.value}>{historyData.condition}</Text>
        <Text style={styles.label}>Doctor's Name:</Text>
        <Text style = {styles.value}>{historyData.doctor}</Text>
        <Text style={styles.label}>Childhood Illness(es):</Text>
        <Text style = {styles.value}>{historyData.childhood}</Text>
        <Text style={styles.label}>Allergies:</Text>
        {historyData.allergies.map((allergy, index) => (
          <Text key={index} style={styles.value}>
            - {allergy}
          </Text>
        ))}


         {/* Lab Results */}
         <Text style={styles.subtitle}>Recent Lab Results</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.tableHeaderText]}>Test</Text>
            <Text style={[styles.tableCell, styles.tableHeaderText]}>Date</Text>
            <Text style={[styles.tableCell, styles.tableHeaderText]}>Result</Text>
          </View>
          {labResultsData.map((result, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{result.test}</Text>
              <Text style={styles.tableCell}>{result.date}</Text>
              <Text style={styles.tableCell}>{result.result}</Text>
            </View>
          ))}
        </View>

        {/* Surgeries */}
        <Text style={styles.subtitle}>Surgeries</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.tableHeaderText]}>Reason</Text>
            <Text style={[styles.tableCell, styles.tableHeaderText]}>Year</Text>
            <Text style={[styles.tableCell, styles.tableHeaderText]}>Hospital</Text>
          </View>
          {surgeriesData.map((surgery, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{surgery.reason}</Text>
              <Text style={styles.tableCell}>{surgery.year}</Text>
              <Text style={styles.tableCell}>{surgery.hospital}</Text>
            </View>
          ))}
        </View>

        {/* Vaccinations */}
        <Text style={styles.subtitle}>Vaccinations</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.tableHeaderText]}>Name</Text>
            <Text style={[styles.tableCell, styles.tableHeaderText]}>Date</Text>
          </View>
          {vaccinationsData.map((vaccination, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{vaccination.name}</Text>
              <Text style={styles.tableCell}>{vaccination.date}</Text>
            </View>
          ))}
          </View>


        {/* Hospitalizations */}
        <Text style={styles.subtitle}>Hospitalizations</Text>
        <Text style={styles.label}>Reason:</Text>
        <Text style={styles.value}>{hospitalizations.reason}</Text>
        <Text style={styles.label}>Year:</Text>
        <Text style={styles.value}>{hospitalizations.year}</Text>
        <Text style={styles.label}>Duration:</Text>
        <Text style={styles.value}>{hospitalizations.duration}</Text>
        <Text style={styles.label}>Hospital:</Text>
        <Text style={styles.value}>{hospitalizations.hospital}</Text>

        {/* Family History */}
        <Text style={styles.subtitle}>Family History</Text>
        <Text style={styles.label}>Father:</Text>
        <Text style={styles.value}>{family.father}</Text>
        <Text style={styles.label}>Mother:</Text>
        <Text style={styles.value}>{family.mother}</Text>
        <Text style={styles.label}>Siblings:</Text>
        {family.siblings.map((sibling, index) => (
          <Text key={index} style={styles.value}>
            - {sibling}
          </Text>
        ))}

        {/* Lifestyle */}
        <Text style={styles.subtitle}>Lifestyle</Text>
        <Text style={styles.label}>Smoking:</Text>
        <Text style={styles.value}>{lifestyle.smoking}</Text>
        <Text style={styles.label}>Alcohol:</Text>
        <Text style={styles.value}>{lifestyle.alcohol}</Text>
        <Text style={styles.label}>Activity Level:</Text>
        <Text style={styles.value}>{lifestyle.activityLevel}</Text>
        <Text style={styles.label}>Diet:</Text>
        <Text style={styles.value}>{lifestyle.diet}</Text>

        <TouchableOpacity style = {styles.edit}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Edit History
            </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5ee",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(58, 22, 20, 0.74)",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#f0e1b9",
    alignSelf: "center",
    textAlign: "center",
    elevation: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3a1614",
    marginVertical: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#555",
    marginBottom: 1,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },

  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0e1b9",
  },
  tableHeaderText: {
    fontWeight: "bold",
    color: "#555",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    textAlign: "center",
  },

  edit: {
    backgroundColor: "#rgb(184, 158, 184)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 90,
  },
  
  editText: {
    fontSize: 16,
    color: "#333",
    alignContent: "center",
    fontWeight: "bold",
  }
});

export default historyPage;
