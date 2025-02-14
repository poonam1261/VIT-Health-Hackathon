import { useState } from 'react';
//import { Link } from 'react-router-dom';
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";

export default historyPage = () => {
  const historyData = {
    name: "John Doe",
    age: "38",
    sex: "Male",
    blood: "O+",
    condition: "Diabetes-Type 2",
    doctor: "Dr. Doctor",
    childhood: "Acanthosis Nigricans",
    allergies: ["Hayfever", "latex"],
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
  

  const surgeriesData = surgeries.reason.map((reason, index) => ({
    reason,
    year: surgeries.year[index],
    hospital: surgeries.hospital[index],
  }));


  const vaccinationsData = vaccinations.name.map((name, index) => ({
    name,
    date: vaccinations.date[index],
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
        <Text style={styles.subtitle}>Medical Details</Text>
        <Text style={styles.label}>Condition:</Text>
        <Text style = {styles.value}>{historyData.condition}</Text>
        <Text style={styles.label}>Doctor's Name:</Text>
        <Text style = {styles.value}>{historyData.doctor}</Text>
        <Text style={styles.label}>Childhood Illness(es):</Text>
        <Text style = {styles.value}>{historyData.childhood}</Text>
        <Text style = {styles.label}>Alcohol Consumption</Text>
        <Text style = {styles.value}>Occasional</Text>
        <Text style={styles.label}>Allergies:</Text>
        {historyData.allergies.map((allergy, index) => (
          <Text key={index} style={styles.value}>
            - {allergy}
          </Text>
        ))}

        {/* Surgeries Section */}
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

        {/* Vaccinations Section */}
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
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f0e1b9",
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
    marginBottom: 10,
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
});
