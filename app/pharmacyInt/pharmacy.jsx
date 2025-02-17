import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';  // Import the icon library
import { FontAwesome5 } from '@expo/vector-icons';  // Use FontAwesome for coin icon

export default function PharmacyPage() {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [points, setPoints] = useState(0); // State to store points
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
          navigation.setOptions({
            headerTitle: 'Pharmacy'
          });
        }, [navigation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      fetchNearbyPharmacies(loc.coords.latitude, loc.coords.longitude);
    })();

    // Fetch points from AsyncStorage
    const fetchPoints = async () => {
        try {
          const storedPoints = await AsyncStorage.getItem("userPoints");
          if (storedPoints) {
            setPoints(parseInt(storedPoints));
          }
        } catch (error) {
          console.error("Error fetching points:", error);
        }
      };
  
      fetchPoints();  // Call to fetch points

  }, []);

  const fetchNearbyPharmacies = async (lat, lon) => {
    // Mock API call (Replace this with real API)
    const mockPharmacies = [
        { id: 1, name: "MediPlus Pharmacy", ad: "Get 20% off today!", image: require("./pharmacy1.png") },
        { id: 2, name: "Wellness Pharmacy", ad: "Free home delivery!", image: require("./pharmacy2.png") },
        { id: 3, name: "HealthFirst", ad: "Special discounts available!", image: require("./pharmacy3.png") },
        { id: 4, name: "PharmaCare", ad: "Buy one, get one free on select items!", image: require("./pharmacy1.png") },
        { id: 5, name: "QuickMed Pharmacy", ad: "Get your prescriptions in under 10 minutes!", image: require("./pharmacy2.png") },
        { id: 6, name: "VitalHealth Pharmacy", ad: "Earn loyalty points with every purchase!", image: require("./pharmacy3.png") },
        { id: 7, name: "LifeAid Pharmacy", ad: "Free health consultations every Friday!", image: require("./pharmacy1.png") },
        { id: 8, name: "CareWell Pharmacy", ad: "Exclusive online discounts available!", image: require("./pharmacy2.png") },
      ];
      
    setPharmacies(mockPharmacies);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Nearby Pharmacies</Text>
        <View style={styles.pointsSection}>
          <FontAwesome5 name="coins" size={24} color="gold" />
          <Text style={styles.pointsText}>{points} Points</Text>
        </View>
      </View>
      
      <FlatList
        data={pharmacies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.ad}>{item.ad}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  pointsSection: {
    position: "absolute",  // Position the points section absolutely
    top: 10,               // 10px from the top
    right: 10,             // 10px from the right
    flexDirection: "row", 
    alignItems: "center", 
    zIndex: 1              // Ensure it appears above other content
  },
  pointsText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginLeft: 8 
  },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { flexDirection: "row", backgroundColor: "#f9f9f9", padding: 10, marginBottom: 10, borderRadius: 8 },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  textContainer: { flex: 1, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold" },
  ad: { fontSize: 14, color: "gray" },
  backButton: { backgroundColor: "#4a90e2", padding: 10, alignItems: "center", borderRadius: 8, marginTop: 10 },
  backText: { color: "#fff", fontSize: 16 },
});
