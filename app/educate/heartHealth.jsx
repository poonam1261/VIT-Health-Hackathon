import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function HeartHealth() {
  // Sample heart rate data (average BPM over a week)
  const heartRateData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [72, 75, 78, 74, 73, 76, 77],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Heart Health</Text>

      <Text style={styles.subHeader}>Your Heart Rate Over the Week</Text>
      <LineChart
        data={heartRateData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#f3f3f3",
          backgroundGradientTo: "#f3f3f3",
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 2,
        }}
        style={styles.chart}
      />

      <Text style={styles.info}>
        A healthy heart rate varies between 60-100 BPM for adults. Regular exercise,
        stress management, and a balanced diet contribute to better heart health.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 26,
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
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a1614",
    marginVertical: 10,
    textAlign: "center",
  },
  chart: {
    marginVertical: 10,
    alignSelf: "center",
  },
  info: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
