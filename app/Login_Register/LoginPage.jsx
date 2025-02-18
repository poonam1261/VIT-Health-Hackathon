import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebaseConfig";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Patient");
  const [loading, setLoading] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const userListAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const toggleUserList = () => {
    if (showUserList) {
      Animated.timing(userListAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowUserList(false));
    } else {
      setShowUserList(true);
      Animated.timing(userListAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      if (user) {
        setLoading(false);
        router.push("(tabs)");
      } else {
        setLoading(false);
        console.error("User not found after login");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error: ", error);
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please try again.",
      );
    }
  };

  return (
    <LinearGradient colors={["#FDFBFB", "#EBF5FC"]} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/docImg2.png")}
                style={styles.frontImage}
              />
            </View>

            {/* Login Card */}
            <View style={styles.card}>
              <Text style={styles.welcomeText}>Welcome Back</Text>

              {/* Email Field */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#888"
                />
              </View>

              {/* Password Field */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  placeholderTextColor="#888"
                />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.registerText}>Don't have an account?</Text>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => router.push("Login_Register/RegisterPage")}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>

      {/* User Type Icon */}
      {!keyboardVisible && (
        <TouchableOpacity
          style={styles.userTypeButton}
          onPress={toggleUserList}
        >
          <Ionicons name="person-circle" size={40} color="#8C7A92" />
        </TouchableOpacity>
      )}

      {/* Animated User Type List */}
      {showUserList && (
        <Animated.View
          style={[
            styles.userListContainer,
            {
              opacity: userListAnim,
              transform: [
                {
                  translateY: userListAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.userListItem}
            onPress={() => setUserType("Patient")}
          >
            <Text style={styles.userListItemText}>Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userListItem}
            onPress={() => setUserType("Doctor")}
          >
            <Text style={styles.userListItemText}>Doctor</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, alignItems: "center", padding: 20 },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 14,
    width: 350,
    height: 210,
    justifyContent: "center",
    alignItems: "center",
  },
  frontImage: { width: 350, height: 210, resizeMode: "contain" },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  welcomeText: { fontSize: 22, fontWeight: "700", color: "#333" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 48, color: "#333" },
  loginButton: {
    width: "100%",
    backgroundColor: "#8C7A92",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  registerText: { fontSize: 14, color: "#666", marginTop: 10 },
  registerButton: {
    marginTop: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#8C7A92",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  userTypeButton: { position: "absolute", bottom: 20, right: 20 },
});

export default LoginScreen;
