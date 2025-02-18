import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const YourComponent = () => {
  // Define the time series for severity of symptoms (severity scale: 0 to 10)
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3'], // X-axis labels for days
    med: ["med1", "med2", "med3", "med4", "med5"],
    datasets: [
      {
        data: [7, 3, 8], // Severity of symptoms for Paracetamol (more fluctuation)
        color: (opacity = 1) => `rgba(255, 105, 180, ${opacity})`, // Pastel pink for Paracetamol
        strokeWidth: 3,
        name: 'Paracetamol',
      },
      {
        data: [5, 8, 4], // Severity of symptoms for Amoxicillin (more fluctuation)
        color: (opacity = 1) => `rgba(144, 202, 249, ${opacity})`, // Pastel blue for Amoxicillin
        strokeWidth: 3,
        name: 'Amoxicillin',
      },
      {
        data: [2, 5, 9], // Severity of symptoms for Vitamin C (more fluctuation)
        color: (opacity = 1) => `rgba(255, 229, 180, ${opacity})`, // Pastel yellow for Vitamin C
        strokeWidth: 3,
        name: 'Vitamin C',
      },
      {
        data: [4, 8, 5], // Severity of symptoms for Ibuprofen (more fluctuation)
        color: (opacity = 1) => `rgba(255, 182, 193, ${opacity})`, // Pastel peach for Ibuprofen
        strokeWidth: 3,
        name: 'Ibuprofen',
      },
      {
        data: [3, 4, 7], // Severity of symptoms for Antacid (more fluctuation)
        color: (opacity = 1) => `rgba(182, 210, 255, ${opacity})`, // Pastel lavender for Antacid
        strokeWidth: 3,
        name: 'Antacid',
      },
    ],
    legend: ["Med1", "Med2", "Med3", "Med4", "Med5"],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFEDF3", alignItems: "center", padding: 5 }}>
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{
          color: 'rgb(226, 217, 238)', // Green-mauve-yellow wine color
          marginBottom: 20, // Space between title and graph
          textAlign: 'center',
          paddingHorizontal: 30,
          backgroundColor: 'rgb(184, 119, 129)', // Light pastel background behind title
          paddingVertical: 8,
          borderRadius: 10,
          width: '100%',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 3,
        }}>
          Symptom Severity over time
        </Text>

        {/* Line Chart */}
        <LineChart
          data={data}
          width={Dimensions.get('window').width} // Adjust chart width
          height={200}
          chartConfig={{
            backgroundColor: "#FFEDF3",
            backgroundGradientFrom: "#FFEDF3",
            backgroundGradientTo: "#FFEDF3",
            decimalPlaces: 2, // Optional: precision for the chart values
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color of axis text
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color of labels
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4', // Dot radius
              strokeWidth: '2', // Dot border width
              stroke: '#fff', // Dot border color
            },
            // Add Y-Axis and X-Axis with labels
            yAxisLabel: '', // No label for Y-axis (default)
            yAxisInterval: 1, // Interval between grid lines on Y-axis
            gridColor: 'transparent', // Remove grid color (transparent)
            gridOpacity: 0, // Remove grid opacity
            // Configure X-Axis
            xAxisLabel: 'Days', // X-axis label
            xAxisInterval: 1, // Set X-axis interval
            xAxisStrokeWidth: 2, // Stroke width for X-axis
            axisLineColor: '#D81B60', // Color for X and Y axis lines
          }}
          bezier // Optional: makes the line curves instead of straight
        />

        {/* Analyzing Section - Positive Effect and Negative Effect */}
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 20 }}>
          {/* Positive Effect Container */}
          <View style={styles.analysisContainerPositive}>
            <Text style={styles.analysisTitle}>Medication is Helping!</Text>
            <Text style={styles.analysisText}>
              Over the past week, your symptoms have significantly reduced while taking this medication. Keep up with the dosage and stay consistent!
            </Text>
          </View>

          {/* Negative Effect Container */}
          <View style={styles.analysisContainerNegative}>
            <Text style={styles.analysisTitle}>Medication Needs Adjustment</Text>
            <Text style={styles.analysisText}>
              It seems like this medication is not helping as expected. Consider speaking with your doctor about alternatives or adjustments.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styling for the analysis containers with contrast colors
const styles = {
  analysisContainerPositive: {
    backgroundColor: "rgb(212, 238, 247)", // Light green background for positive effect
    padding: 10,
    borderRadius: 15,
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  analysisContainerNegative: {
    backgroundColor: "rgb(227, 246, 219)", // Light red background for negative effect
    padding: 10,
    borderRadius: 15,
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D81B60', // Pinkish color for the title
    marginBottom: 10,
    textAlign: 'center',
  },
  analysisText: {
    fontSize: 14,
    color: '#4A148C', // Darker text color for readability
    textAlign: 'center',
    lineHeight: 20,
  },
};

export default YourComponent;
