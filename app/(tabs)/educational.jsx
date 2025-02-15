// (tabs)/educational.jsx
import React from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Educational() {
  const router = useRouter();
  
  const buttons = [
    { id: 'diet', title: 'Diet', icon: <MaterialIcons name="local-dining" size={40} color="#fff" /> },
    { id: 'simplerTerms', title: 'Simpler Terms', icon: <FontAwesome5 name="book-reader" size={40} color="#fff" /> },
    { id: 'sleep', title: 'Sleep', icon: <MaterialIcons name="hotel" size={40} color="#fff" /> },
    { id: 'exercise', title: 'Exercise', icon: <FontAwesome5 name="dumbbell" size={40} color="#fff" /> },
    { id: 'mentalHealth', title: 'Mental Health', icon: <MaterialIcons name="self-improvement" size={40} color="#fff" /> },
    { id: 'mindfulness', title: 'Mindfulness', icon: <MaterialIcons name="nature" size={40} color="#fff" /> },
    { id: 'heartHealth', title: 'Heart Health', icon: <FontAwesome5 name="heartbeat" size={40} color="#fff" /> },
    { id: 'stressRelief', title: 'Stress Relief', icon: <MaterialIcons name="emoji-nature" size={40} color="#fff" /> }
  ];

  return (
    <LinearGradient colors={["#dac6be", "#ccb0a4", "#bd9989"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Lifestyle</Text>
        </View>
        
        {/* Added ScrollView to enable scrolling */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {buttons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={styles.button}
              onPress={() => router.push(`/article/${button.id}`)}
            >
              {button.icon}
              <Text style={styles.buttonText}>{button.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    paddingVertical: 10,
    backgroundColor: "#ae887b",
    alignItems: "center",
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    // Added padding to prevent content from getting cut off
    paddingBottom: 30,
  },
  button: {
    width: 160,
    height: 140,
    backgroundColor: "#8c9a8d",
    marginVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
