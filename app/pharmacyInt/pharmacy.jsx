import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useCoins, CoinsProvider } from "../contexts/CoinContext";

function PharmacyPageComponent() {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const navigation = useNavigation();
  const { coins, subCoins } = useCoins();
  const REDEEM_COST = 10; // Cost in points

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
  }, []);

  const generateCode = () => {
    if (coins < REDEEM_COST) {
      alert("Not enough points to redeem a code!");
      return;
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setGeneratedCode(code);
    subCoins(REDEEM_COST); // Deduct points
  };

  const fetchNearbyPharmacies = async (lat, lon) => {
    const mockPharmacies = [
      { id: 1, name: "Apollo Pharmacy", ad: "Save up to 30% on medicines!", image: require("./pharmacy_1.jpg") },
      { id: 2, name: "Aster Pharmacy", ad: "Get free health check-ups with every purchase!", image: require("./pharmacy_2.jpg") },
      { id: 3, name: "PharmEasy", ad: "Flat 25% off on your first order!", image: require("./pharmacy_3.jpg") },
      { id: 4, name: "Tata 1mg", ad: "Enjoy exclusive discounts on wellness products!", image: require("./pharmacy_4.jpg") },
      { id: 5, name: "MedPlusMart", ad: "Get your prescriptions in under 10 minutes!", image: require("./pharmacy_5.jpg") },
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
          <Text style={styles.pointsText}>{coins} Points</Text>
        </View>
      </View>

      <FlatList
        data={pharmacies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedPharmacy(item);
              setIsModalVisible(true);
              setGeneratedCode('');
            }}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.ad}>{item.ad}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{selectedPharmacy?.name}</Text>
            <Text style={styles.modalAd}>{selectedPharmacy?.ad}</Text>

            {!generatedCode ? (
              <>
                <Text style={styles.redeemCostText}>
                  Redeem this offer for {REDEEM_COST} points
                </Text>
                <TouchableOpacity
                  style={[
                    styles.redeemButton,
                    coins < REDEEM_COST && styles.disabledButton
                  ]}
                  onPress={generateCode}
                  disabled={coins < REDEEM_COST}
                >
                  <Text style={styles.redeemButtonText}>
                    {coins >= REDEEM_COST ? "Redeem Code" : "Not Enough Points"}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>{generatedCode}</Text>
                <Text style={styles.codeInstructions}>
                  Use this code during checkout to redeem your offer!
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function PharmacyPage() {
  return (
    <CoinsProvider>
      <PharmacyPageComponent />
    </CoinsProvider>
  );
}



const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  pointsSection: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1
  },
  pointsText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginLeft: 8 
  },
  header: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  card: { 
    flexDirection: "row", 
    backgroundColor: "#f9f9f9", 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 8 
  },
  image: { 
    width: 60, 
    height: 60, 
    borderRadius: 10, 
    marginRight: 10 
  },
  textContainer: { 
    flex: 1, 
    justifyContent: "center" 
  },
  name: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  ad: { 
    fontSize: 14, 
    color: "gray" 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    position: "relative"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  modalAd: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center'
  },
  redeemButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  redeemButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 30,
    height: 30,
    backgroundColor: '#bf616a',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16
  },
  codeContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    letterSpacing: 2,
    marginBottom: 10
  },
  codeInstructions: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14
  },
  backButton: { 
    backgroundColor: "#b89eb8", 
    padding: 10, 
    alignItems: "center", 
    borderRadius: 8, 
    marginTop: 10 
  },
  backText: { 
    color: "#fff", 
    fontSize: 16 
  },
  redeemCostText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});