import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Symptom = ({ text, onUpdateSeverity }) => {
  const [selectedSeverity, setSelectedSeverity] = useState(0);

  const severityColors = ["#a3e4a3", "#f7d794", "#ff7675"];

  // Handle severity selection
  const handleSeverityChange = (level) => {
    setSelectedSeverity(level);
    onUpdateSeverity(level); // Pass the selected severity back to the parent
  };

  return (
    <View style={styles.row}>
      <Text style={styles.itemText}>{text}</Text>

      {/* Severity Buttons */}
      <View style={styles.severityContainer}>
        {[1, 2, 3].map((level) => (
          <TouchableOpacity key={level} onPress={() => handleSeverityChange(level)}>
            <FontAwesome
              name="circle"
              size={24}
              color={level <= selectedSeverity ? severityColors[selectedSeverity - 1] : "#d3d3d3"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#a8c686",
  },
  itemText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 10,
  },
  severityContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Symptom;