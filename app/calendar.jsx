import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { ProgressBar } from "react-native-paper";

const MedDash = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // 🔥 Hardcoded Streak
  const streak = 4; // Change this manually to test different streak levels

  // 📅 Hardcoded Medication Data
  const medicationData = {
    "2025-02-14": [{ name: "Aspirin", time: "8:00 AM" }],
    "2025-02-15": [{ name: "Vitamin D", time: "12:00 PM" }],
    "2025-02-16": [{ name: "Ibuprofen", time: "7:00 AM" }],
    "2025-02-17": [{ name: "Omega 3", time: "6:00 AM" }],
  };

  // 📌 Hardcoded Marked Dates (Pastel Dots)
  const markedDates = {
    "2025-02-14": { marked: true, dotColor: "#B8A8D1" },
    "2025-02-15": { marked: true, dotColor: "#AFC8E7" },
    "2025-02-16": { marked: true, dotColor: "#FFD1DC" },
    "2025-02-17": { marked: true, dotColor: "#FFE5B4" },
  };

  return (
    <View style={styles.container}>
      <View 
      style={{
        backgroundColor: '#FFF9C4', // Soft pastel yellow background
        padding:5,
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
      <Text style={styles.headerText}>You are doing great!</Text>

      </View>
    
      {/* 🔥 Hardcoded Streak Progress */}
      <Card style={styles.streakCard}>
        <Text style={styles.streakText}>🔥 Streak: {streak} Days</Text>
        <ProgressBar progress={streak / 7} color="#AFC8E7" style={styles.progressBar} />
        <Text style={styles.streakTip}>{streak > 0 ? "Keep it going! 💪" : "Start today! 📆"}</Text>
      </Card>

      {/* 📅 Hardcoded Calendar */}
      <Card style={styles.calendarCard}>
        <Calendar 
          markedDates={markedDates}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setModalVisible(true);
          }}
          
          theme={{
            backgroundColor: "#FDF7F4",
            calendarBackground: "#FDF7F4",
            todayTextColor: "#AFC8E7",
            selectedDayBackgroundColor: "#B8A8D1",
            arrowColor: "#B8A8D1",
            dayTextColor: "#6B6B6B",
            monthTextColor: "#6B6B6B",
          }}
        />
      </Card>

      {/* 🛑 Hardcoded Medication Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Medications for {selectedDate}</Text>
            {medicationData[selectedDate] ? (
              <FlatList
                data={medicationData[selectedDate]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.medItem}>
                    <Text style={styles.medText}>{item.name}</Text>
                    <Text style={styles.medTime}>{item.time}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noMedText}>No medications scheduled.</Text>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF7F4", paddingHorizontal: 15, paddingTop: 40 },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#6B6B6B", textAlign: "center", marginBottom: 20 },

  /* 🔥 Streak Section */
  streakCard: { backgroundColor: "#FFF", padding: 15, borderRadius: 15, elevation: 3, marginBottom: 20 },
  streakText: { fontSize: 18, fontWeight: "bold", color: "#6B6B6B", textAlign: "center" },
  progressBar: { height: 10, borderRadius: 10, marginTop: 10 },
  streakTip: { fontSize: 14, textAlign: "center", color: "#6B6B6B", marginTop: 5 },

  /* 📅 Calendar */
  calendarCard: {
    width: 350, // 🔥 Reduce card width
    padding: 10,
    borderRadius: 15,
    alignSelf: "center", // Center the card
    backgroundColor: "#FDF7F4",
    elevation: 3, // Subtle shadow
  },
  shrunkCalendar: {
    width: 280, // 🔥 Shrink the calendar width
    height: 280, // 🔥 Shrink the calendar height
    alignSelf: "center",
    
  },

  /* 🛑 Modal */
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.2)" },
  modalContent: { backgroundColor: "#FFF", padding: 20, borderRadius: 15, width: "80%", alignItems: "center" },
  modalHeader: { fontSize: 18, fontWeight: "bold", color: "#6B6B6B", marginBottom: 10 },
  medItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  medText: { fontSize: 16, fontWeight: "bold", color: "#6B6B6B" },
  medTime: { fontSize: 14, color: "#666" },
  noMedText: { fontSize: 16, color: "#999" },
  closeButton: { backgroundColor: "#B8A8D1", padding: 10, borderRadius: 10, marginTop: 10 },
  closeButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default MedDash;
