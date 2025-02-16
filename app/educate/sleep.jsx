import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Sleep() {
  // Sample sleep data (hours slept over a week)
  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [6, 7.5, 8, 6.5, 7, 8, 7.5],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sleep Quality</Text>
      
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

      <Text style={styles.info}>
        Good sleep quality is essential for cognitive function and overall health.
        Try maintaining a consistent sleep schedule and avoiding screens before bedtime.
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
