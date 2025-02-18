import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import BlobAnimation from "../../components/BlobAnimation"


export default function SimplerTerms() {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [isAnimationVisible, setIsAnimationVisible] = useState(true);
  
  useFocusEffect(
      useCallback(() => {
        setIsAnimationVisible(true); // Show animation when screen is focused
        return () => setIsAnimationVisible(false); // Hide animation when screen is unfocused
      }, [])
    );

  const fetchDefinition = async () => {
    if (!word.trim()) return;
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setDefinition(data[0].meanings[0].definitions[0].definition);
      } else {
        setDefinition("Definition not found.");
      }
    } catch (error) {
      setDefinition("Error fetching definition.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.container}>
        <Text style={styles.title}>Simpler Terms</Text>
        <BlobAnimation style = {styles.blobContainer}
        isVisible={true}
        positionStyle={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 250,
          height: 250,
        }}
      />
        <TextInput
          style={styles.input}
          placeholder="Enter a word, I'll explain it for you ^_^"
          placeholderTextColor={"grey"}
          value={word}
          onChangeText={setWord}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchDefinition}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {definition && (
          <ScrollView style={styles.resultContainer}>
            <Text style={styles.resultText}>{definition}</Text>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 50 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  blobContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 20 
  },

  searchButton: {
    backgroundColor: "rgb(184, 158, 184)",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  resultContainer: { 
    marginTop: 20, 
    padding: 15, 
    backgroundColor: "#f3f3f3", 
    borderRadius: 10, 
    width: "100%" 
  },
  resultText: { fontSize: 18, textAlign: "center" },

  // Fixed Back Button
  backButton: {
    position: "absolute",
    top: 10, 
    left: 10, 
    padding: 10, 
    zIndex: 10,
  },
  backText: { fontSize: 18, color: "#rgb(184, 158, 184)", fontWeight: "bold" },
});
