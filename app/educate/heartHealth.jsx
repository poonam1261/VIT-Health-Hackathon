// import React from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";

// const screenWidth = Dimensions.get("window").width;

// export default function HeartHealth() {
//   // Sample heart rate data (average BPM over a week)
//   const heartRateData = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         data: [72, 75, 78, 74, 73, 76, 77],
//         strokeWidth: 2,
//       },
//     ],
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Heart Health</Text>

//       <Text style={styles.subHeader}>Your Heart Rate Over the Week</Text>
//       <LineChart
//         data={heartRateData}
//         width={screenWidth - 40}
//         height={220}
//         chartConfig={{
//           backgroundGradientFrom: "#f3f3f3",
//           backgroundGradientTo: "#f3f3f3",
//           color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
//           strokeWidth: 2,
//         }}
//         style={styles.chart}
//       />

//       <Text style={styles.info}>
//         A healthy heart rate varies between 60-100 BPM for adults. Regular exercise,
//         stress management, and a balanced diet contribute to better heart health.
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "rgba(58, 22, 20, 0.74)",
//     alignSelf: "center",
//     marginBottom: 10,
//     marginTop: 10,
//     borderRadius: 10,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: 5,
//     paddingBottom: 5,
//     backgroundColor: "#f0e1b9",
//     alignSelf: "center",
//     textAlign: "center",
//     elevation: 10,
//   },
//   subHeader: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#3a1614",
//     marginVertical: 10,
//     textAlign: "center",
//   },
//   chart: {
//     marginVertical: 10,
//     alignSelf: "center",
//   },
//   info: {
//     fontSize: 16,
//     marginTop: 20,
//     textAlign: "center",
//   },
// });

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useNavigation } from "expo-router"; 

const screenWidth = Dimensions.get("window").width;

export default function HeartHealth() {

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: 'Heart Health'
      });
    }, [navigation]);

  // Sample heart rate data (average BPM over a week)
  const heartRateData = {
    labels: ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        data: [72, 75, 78, 74, 73, 76, 77, 74, 76, 79, 75, 74, 78, 80], // Resting HR
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
      {
        data: [100, 105, 110, 98, 95, 107, 108, 102, 106, 112, 99, 97, 109, 113], // Active HR
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
      },
    ],
  };

  // Sample blood pressure data (Systolic & Diastolic)
  const bloodPressureData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [120, 122, 118, 121, 119, 124, 123], // Systolic
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`,
      },
      {
        data: [80, 82, 78, 79, 77, 85, 83], // Diastolic
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Heart Health</Text>

      <Text style={styles.subHeader}>Heart Rate Trends (Resting vs. Active)</Text>
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

      <Text style={styles.subHeader}>Blood Pressure Trends (Systolic & Diastolic)</Text>
      <LineChart
        data={bloodPressureData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#f3f3f3",
          backgroundGradientTo: "#f3f3f3",
          color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`,
          strokeWidth: 2,
        }}
        style={styles.chart}
      />

      <Text style={styles.info}>
        A normal resting heart rate is between **60-100 BPM**. Your active heart rate should ideally be
        between **100-170 BPM** during workouts. Blood pressure should typically be around **120/80 mmHg**.
      </Text>

      <Text style={styles.note}>
        ⚡ **Tip:** Keep your heart healthy with regular exercise, hydration, and stress management.
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
    textAlign: "center",
    elevation: 10,
  },
  subHeader: {
    fontSize: 14,
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
  note: {
    fontSize: 14,
    marginTop: 10,
    color: "#555",
    textAlign: "center",
    fontStyle: "italic",
  },
});
