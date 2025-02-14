import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig"; // Adjust the path according to your project structure
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../../config";

function RegisterScreen({ navigation }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // First, check if the patient already exists
        fetch(`${API_BASE_URL}/api/patients/${user.uid}/`)
          .then((checkResponse) => {
            if (checkResponse.status === 404) {
              // Patient does not exist, so create a new entry
              return fetch(`${API_BASE_URL}/api/patients/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: user.uid, // Using the Firebase user UID as the patient's custom ID
                  name: "John Doe", // Hardcoded name for now
                }),
              });
            } else if (checkResponse.ok) {
              // Patient already exists, so we don't create a new entry
              console.log("Patient already exists, not creating a new entry.");
              return null;
            } else {
              throw new Error(
                `Error checking patient: ${checkResponse.statusText}`,
              );
            }
          })
          .then((response) => {
            // If a creation request was made, process its response
            if (response) {
              if (!response.ok) {
                throw new Error(
                  `Failed to create patient: ${response.statusText}`,
                );
              }
              return response.json();
            }
            return null;
          })
          .then((patientData) => {
            if (patientData) {
              console.log("Patient created:", patientData);
            }
          })
          .catch((error) => {
            console.error("Error creating patient:", error);
          });

        // ✅ Ensure user is logged in before sending verification
        if (user) {
          sendEmailVerification(user)
            .then(() => {
              Alert.alert(
                "Verification Email Sent",
                "Please check your email to verify your account before logging in.",
              );
              router.push("Login_Register/LoginPage"); // Ensure correct route name
            })
            .catch((error) => {
              console.error("Email Verification Error: ", error);
              Alert.alert("Email Verification Failed", error.message);
            });
        } else {
          Alert.alert("User not found", "Please try registering again.");
        }
      })
      .catch((error) => {
        console.error("Registration Error: ", error);
        Alert.alert("Registration Failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <View style={styles.frontImageContainer}></View>
      <View style={styles.customer}>
        <TouchableOpacity
          style={styles.buttonDesigner}
          onPress={() => console.log("Designer pressed")}
        >
          <Button color="#ff4468" title="Customer Registration" />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Create Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <Button color="#ff4468" title="Register" onPress={handleRegister} />
      </View>
      <Text style={styles.textSmall}>Already have an account?</Text>
      <View style={styles.registerButton}>
        <Button
          color="#ff4468"
          title="Login"
          onPress={() => router.push("Login_Register/LoginPage")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frontImageContainer: {
    marginTop: 40,
  },
  customer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "170",
    marginTop: 10,
  },
  buttonCustomer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonDesigner: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  frontImage: {
    width: 350,
    height: 210,
    resizeMode: "stretch",
  },
  imageContainer: {
    position: "absolute",
    left: 20,
    top: 10,
    marginBottom: 0,
  },
  frontImageContainer: {
    marginBottom: 20,
    borderRadius: 20,
    marginTop: 50,
    borderWidth: 4,
    borderColor: "#C9C4AA",
    overflow: "hidden",
    borderRadius: 14,
    elevation: 8,
    shadowOpacity: 0.3,
    shadowColor: "black",
    shadowRadius: 12,
    width: 350,
    height: 210,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  textSmall: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
  registerButton: {
    marginTop: 10,
    width: "80%",
  },
});

export default RegisterScreen;
