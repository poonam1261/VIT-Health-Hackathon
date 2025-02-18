import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";

const UndertakingScreen = () => {
  const [signature, setSignature] = useState(null);
  const signatureRef = useRef(null);

  // Called when the user finishes signing
  const handleOK = (sig) => {
    setSignature(sig);
  };

  // Clears the signature canvas
  const handleClear = () => {
    signatureRef.current.clearSignature();
    setSignature(null);
  };

  // Save the undertaking (this example simply shows an alert)
  const saveUndertaking = () => {
    if (!signature) {
      Alert.alert("Error", "Please provide your signature.");
      return;
    }
    // REDIRECT HERE
    Alert.alert("Success", "Undertaking signed successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Undertaking Agreement</Text>

      {/* Basic Conditions */}
      <View style={styles.conditionsContainer}>
        <Text style={styles.conditionText}>
          1. I agree to abide by all the rules and regulations.
        </Text>
        <Text style={styles.conditionText}>
          2. I confirm that the information provided is accurate.
        </Text>
        <Text style={styles.conditionText}>
          3. I understand that non-compliance may result in consequences.
        </Text>
        <Text style={styles.conditionText}>
          4. I acknowledge that I have read and understood the terms.
        </Text>
      </View>

      {/* Signature Section */}
      <Text style={styles.signatureTitle}>Your Signature</Text>
      <SignatureScreen
        ref={signatureRef}
        onOK={handleOK}
        descriptionText="Sign below"
        onEnd={() => signatureRef.current.readSignature()}
        webStyle={signaturePadStyle}
      />

      {/* Buttons to Clear & Save */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear Signature</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveUndertaking}>
          <Text style={styles.buttonText}>Save Undertaking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// This custom webStyle string allows you to style the signature canvas in the webview
const signaturePadStyle = `
  .m-signature-pad--footer {display: none; margin: 0px; }
  body,html {
    width: 100%; height: 100%; margin: 0;
  }
  .m-signature-pad {box-shadow: none; border: none; }
`;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  conditionsContainer: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  conditionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  signatureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UndertakingScreen;
