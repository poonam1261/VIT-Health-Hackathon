import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function Sleep() {
  // Sample sleep data (hours slept over a week)
  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [6, 7.5, 8, 6.5, 7, 4, 7.5],
        strokeWidth: 2,
      },
    ],
  };

  const getSleepColor = (hours) => {
    if (hours >= 7) return "#A3D9A5";
    if (hours >= 5) return "#f7d794";
    return "#F76C6C";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sleep Quality</Text>

      {/* Sleep Score Section */}
      <View style={styles.sleepScoreContainer}>
        <FontAwesome name="moon-o" size={30} color="#3a1614" />
        <View style={styles.sleepScoreText}>
          <Text style={styles.sleepScoreTitle}>Your Weekly Sleep Score</Text>
          <Text style={styles.sleepScoreValue}>78/100</Text>
        </View>
      </View>

      {/* Sleep Duration Chart */}
      <Text style={styles.subHeader}>Your Sleep Duration Over the Week</Text>
      <LineChart
        data={sleepData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#f3f3f3",
          backgroundGradientTo: "#f3f3f3",
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          strokeWidth: 2,
        }}
        style={styles.chart}
      />

      {/* Daily Breakdown */}
      <Text style={styles.subHeader}>Daily Breakdown</Text>
      <View style={styles.dailyBreakdown}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <View key={index} style={[styles.dayBox, { backgroundColor: getSleepColor(sleepData.datasets[0].data[index]) }]}>
            <Text style={styles.dayLabel}>{day}</Text>
            <Text style={styles.hoursSlept}>{sleepData.datasets[0].data[index]} hrs</Text>
            <Text style={styles.recommendation}>
              {sleepData.datasets[0].data[index] >= 7 ? "Great!" : "Needs Improvement"}
            </Text>
          </View>
        ))}
      </View>

      {/* Sleep Tips */}
      <Text style={styles.subHeader}>Better Sleep Tips</Text>
      <View style={styles.sleepTips}>
        <Text style={styles.tipItem}>🌙 Maintain a consistent sleep schedule.</Text>
        <Text style={styles.tipItem}>📵 Avoid screens 30 minutes before bed.</Text>
        <Text style={styles.tipItem}>💡 Reduce caffeine intake in the evening.</Text>
        <Text style={styles.tipItem}>🧘 Try relaxing activities like reading or meditation.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
    padding: 20,
    backgroundColor: "#fff" },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a1614",
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: "#f0e1b9",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3a1614",
    marginVertical: 10,
    textAlign: "center",
  },
  chart: { marginVertical: 10,
    alignSelf: "center" },

  sleepScoreContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sleepScoreText: { marginLeft: 10 },
  sleepScoreTitle: { fontSize: 14, fontWeight: "bold", color: "#3a1614" },
  sleepScoreValue: { fontSize: 22, fontWeight: "bold", color: "#3a1614" },

  dailyBreakdown: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dayBox: {
    width: "30%",
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  dayLabel: { fontSize: 14, fontWeight: "bold", color: "#3a1614" },
  hoursSlept: { fontSize: 18, fontWeight: "bold", marginVertical: 5 },
  recommendation: { fontSize: 12, color: "#3a1614" },

  sleepTips: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  tipItem: { fontSize: 14, marginBottom: 5, color: "#3a1614" },
});
