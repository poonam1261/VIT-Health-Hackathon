import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  UIManager,
  Platform,
  Image,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import BlobAnimation from "../../components/BlobAnimation.jsx";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCoins } from "../contexts/CoinContext.jsx";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ICONS & CARDS
const PillIcon = () => (
  <LinearGradient
    colors={["#FFCDD2", "#E57373"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.pillIcon}
  />
);

const CalendarIcon = ({ gradientColors }) => (
  <LinearGradient
    colors={gradientColors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.calendarIcon}
  >
    <Ionicons name="calendar" size={20} color="white" />
  </LinearGradient>
);

const MedicationCard = ({ tooltipText, cardWidth, router }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handlePress = () => {
    if (!tooltipVisible) {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    } else {
      router.push("./meddash");
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <LinearGradient
        colors={["#FFE0B2", "#FFB74D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.medicationCard,
          { width: cardWidth ? cardWidth - 20 : 300 },
        ]}
      >
        <PillIcon />
        <Text style={styles.medicationText} numberOfLines={1}>
          {tooltipText}
        </Text>
        {tooltipVisible && (
          <Animated.View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{tooltipText}</Text>
          </Animated.View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const AppointmentCard = ({ tooltipText, timeIndicator, cardWidth, router }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const gradientColors =
    timeIndicator === "Today"
      ? ["hsl(60, 100.00%, 94.50%)", "rgb(251, 209, 104)"]
      : timeIndicator === "Tomorrow"
        ? ["#fff59d", "#fff176"]
        : ["#a5d6a7", "#81c784"];

  const handlePress = () => {
    if (!tooltipVisible) {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    } else {
      router.push("./telemed");
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.appointmentCard,
          { width: cardWidth ? cardWidth - 20 : 300 },
        ]}
      >
        <CalendarIcon gradientColors={gradientColors} />
        <Text style={styles.appointmentText} numberOfLines={1}>
          {timeIndicator}
        </Text>
        {tooltipVisible && (
          <Animated.View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{tooltipText}</Text>
          </Animated.View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const [animationData, setAnimationData] = useState(null);
  const router = useRouter();
  const navigation = useNavigation();

  const medicationData = [
    { id: "1", tooltipText: "Ibuprofen, 9AM" },
    { id: "2", tooltipText: "Insulin, 7AM" },
    { id: "3", tooltipText: "Vaccine, 10AM" },
    { id: "4", tooltipText: "Aspirin, 1PM" },
    { id: "5", tooltipText: "Vitamin D, 8AM" },
  ];
  const appointmentData = [
    { id: "1", tooltipText: "Dentist Appointment", timeIndicator: "Today" },
    { id: "2", tooltipText: "Therapy Session", timeIndicator: "Tomorrow" },
    { id: "3", tooltipText: "Eye Exam", timeIndicator: "Upcoming" },
    { id: "4", tooltipText: "General Checkup", timeIndicator: "Today" },
    { id: "5", tooltipText: "Cardiology", timeIndicator: "Upcoming" },
  ];

  const [notificationList, setNotificationList] = useState([
    "Meds or your family.",
    "🏃‍♂️ Time for a quick stretch!",
    "🍎 Eat a healthy snack.",
    "📅 Appointment at 3 PM",
    "🚴‍♂️ Go for a bike ride!",
  ]);

  const [happinessScore, setHappinessScore] = useState(0);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [notificationExpanded, setNotificationExpanded] = useState(false);
  const [showCoinsPopup, setShowCoinsPopup] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const { coins, addCoins } = useCoins();

  const initialTaskCount = useRef(notificationList.length);
  const notificationScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(notificationScale, {
      toValue: notificationExpanded ? 1.05 : 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [notificationExpanded]);

  useEffect(() => {
    if (
      tasksCompleted === initialTaskCount.current &&
      initialTaskCount.current > 0
    ) {
      setShowCoinsPopup(true);
      addCoins(10);
    }
  }, [tasksCompleted]);

  const handlePanGestureStateChange = (event) => {
    if (notificationList.length === 0) return;
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      const threshold = 30;
      if (translationX < -threshold) {
        setNotificationExpanded(false);
        setNotificationIndex((prev) => (prev + 1) % notificationList.length);
      } else if (translationX > threshold) {
        setNotificationExpanded(false);
        setNotificationIndex((prev) =>
          prev === 0 ? notificationList.length - 1 : prev - 1,
        );
      }
    }
  };

  const [meterWidth, setMeterWidth] = useState(0);

  const happinessAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(happinessAnim, {
      toValue: happinessScore,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [happinessScore]);

  const fillWidth = happinessAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, meterWidth],
  });

  // 2. On mount, load score from AsyncStorage
  useEffect(() => {
    const loadScore = async () => {
      const storedScore = await AsyncStorage.getItem("healthScore");
      if (storedScore !== null) {
        setHappinessScore(parseInt(storedScore, 10));
      } else {
        setHappinessScore(0);
        await AsyncStorage.setItem("healthScore", "0");
      }
    };
    loadScore();
  }, []);

  // 3. On focus, re-load the score (in case it changed on another screen)
  useFocusEffect(
    useCallback(() => {
      setTimeout(async () => {
        const storedScore = await AsyncStorage.getItem("healthScore");
        if (storedScore !== null) {
          setHappinessScore(parseInt(storedScore, 10));
        }
      }, 100); // short delay
    }, []),
  );

  // 4. Whenever happinessScore changes, save to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem("healthScore", happinessScore.toString()).catch(
      (err) => console.error("Error storing score:", err),
    );
  }, [happinessScore]);

  // 5. “Signal” for animation changes => if happinessScore changes, pick correct animation
  useEffect(() => {
    console.log("Score changed to:", happinessScore);
    if (happinessScore < 25) {
      setAnimationData(require("../../assets/animations/angry.json"));
    } else if (happinessScore < 50) {
      setAnimationData(require("../../assets/animations/concerned.json"));
    } else if (happinessScore < 75) {
      setAnimationData(require("../../assets/animations/idle.json"));
    } else {
      setAnimationData(require("../../assets/animations/happy.json"));
    }
  }, [happinessScore]);

  // ---------------------------
  // 6. Accept Task -> Increase Score
  // ---------------------------
  const handleTaskDone = () => {
    setTasksCompleted((prev) => prev + 1);
    // Increase score by 10, capped at 100
    setHappinessScore((prev) => Math.min(prev + 10, 100));
    removeCurrentNotification();
  };

  // ---------------------------
  // 7. Ignore Task -> Decrease Score
  // ---------------------------
  const handleTaskIgnored = () => {
    // Decrease score by 10, floored at 0
    setHappinessScore((prev) => Math.max(prev - 10, 0));
    removeCurrentNotification();
  };

  // ---------------------------
  // 8. Remove Notification
  // ---------------------------
  const removeCurrentNotification = () => {
    setNotificationExpanded(false);
    setNotificationList((prevList) => {
      const newList = [...prevList];
      newList.splice(notificationIndex, 1);
      return newList;
    });
    setNotificationIndex((prev) =>
      notificationList.length <= 1 ? 0 : prev % (notificationList.length - 1),
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Home</Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("VoiceAssistance")}
            >
              <Entypo
                name="mic"
                size={28}
                color="white"
                style={{ alignSelf: "flex-end" }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("profhist/profile")}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: "https://th.bing.com/th/id/OIP.RnJxrWFyL3eU5OUVnecnTQHaHa?w=206&h=207&c=7&r=0&o=5&dpr=1.5&pid=1.7",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.mainContainer}>
          <View style={styles.topSection}>
            <View style={styles.petAndNotificationContainer}>
              <View style={styles.petWrapper}>
                <BlobAnimation
                  isVisible={true}
                  positionStyle={{
                    alignSelf: "center",
                    position: "relative",
                  }}
                  onScoreChange={setHappinessScore}
                  score={happinessScore}
                />

                {notificationList.length > 0 && (
                  <PanGestureHandler
                    onHandlerStateChange={handlePanGestureStateChange}
                  >
                    <Animated.View
                      style={[
                        styles.notificationBubble,
                        {
                          position: "absolute",
                          top: 10,
                          left: 140,
                          transform: [{ scale: notificationScale }],
                        },
                      ]}
                      onStartShouldSetResponder={() => true}
                      onResponderRelease={() =>
                        setNotificationExpanded((prev) => !prev)
                      }
                    >
                      <View style={styles.bubbleTailBorder} />
                      <View style={styles.bubbleTailInner} />
                      <Text style={styles.notificationBubbleText}>
                        {notificationList[notificationIndex]}
                      </Text>
                      {notificationExpanded && (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginTop: 8,
                          }}
                        >
                          <TouchableOpacity onPress={handleTaskDone}>
                            <Ionicons
                              name="checkmark-circle"
                              size={22}
                              color="green"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={handleTaskIgnored}>
                            <Ionicons
                              name="close-circle"
                              size={22}
                              color="red"
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </Animated.View>
                  </PanGestureHandler>
                )}
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressRow}>
                <View
                  style={[
                    styles.progressBar,
                    styles.halfWidth,
                    { marginRight: 5, marginLeft: 10 },
                  ]}
                >
                  <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabel}>Tasks</Text>
                  </View>
                  <View
                    style={styles.progressMeter}
                    onLayout={(e) => setMeterWidth(e.nativeEvent.layout.width)}
                  >
                    <Animated.View
                      style={{
                        width:
                          meterWidth *
                          (tasksCompleted / initialTaskCount.current),
                        height: "100%",
                      }}
                    >
                      <LinearGradient
                        colors={["#4FC3F7", "#0288D1"]}
                        style={{ flex: 1, borderRadius: 8 }}
                      />
                    </Animated.View>
                    <Text style={styles.progressValue}>
                      {tasksCompleted} / {initialTaskCount.current}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.progressBar,
                    styles.halfWidth,
                    { marginLeft: 5, marginRight: 10 },
                  ]}
                >
                  <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabel}>Happiness</Text>
                  </View>
                  <View style={styles.progressMeter}>
                    <Animated.View style={{ width: fillWidth, height: "100%" }}>
                      <LinearGradient
                        colors={["#81C784", "#388E3C"]}
                        style={{ flex: 1, borderRadius: 8 }}
                      />
                    </Animated.View>
                    <Text style={styles.progressValue}>{happinessScore}%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Medications</Text>
                <View style={styles.counterContainer}>
                  <Text style={styles.counterText}>
                    {medicationData.length}
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
              >
                {medicationData.map((item) => (
                  <MedicationCard
                    key={item.id}
                    tooltipText={item.tooltipText}
                    cardWidth={250}
                    router={router}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Appointments</Text>
                <View style={styles.counterContainer}>
                  <Text style={styles.counterText}>
                    {appointmentData.length}
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
              >
                {appointmentData.map((item) => (
                  <AppointmentCard
                    key={item.id}
                    tooltipText={item.tooltipText}
                    timeIndicator={item.timeIndicator}
                    cardWidth={250}
                    router={router}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        {showCoinsPopup && (
          <View style={styles.popupContainer}>
            <Animated.View style={styles.popup}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCoinsPopup(false)}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  size={28}
                  color="#829582"
                />
              </TouchableOpacity>

              <LinearGradient
                colors={["#FFE0B2", "#FFB74D"]}
                style={styles.popupContent}
              >
                <MaterialCommunityIcons
                  name="coin"
                  size={48}
                  color="#FFD700"
                  style={styles.coinIcon}
                />
                <Text style={styles.popupTitle}>Congratulations! 🎉</Text>
                <Text style={styles.popupText}>
                  You've earned 10 coins to redeem at the pharmacy!
                </Text>

                <TouchableOpacity
                  style={styles.redeemButton}
                  onPress={() => router.push("../pharmacyInt/pharmacy")}
                >
                  <LinearGradient
                    colors={["#829582", "#667B66"]}
                    style={styles.redeemButtonGradient}
                  >
                    <Text style={styles.redeemButtonText}>Redeem Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  header: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#829582",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  mainContainer: { padding: 8 },
  topSection: { flex: 2, marginBottom: 12 },
  petAndNotificationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  petWrapper: { position: "relative", marginLeft: 20 },
  notificationBubble: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 0.4,
    borderColor: "#ccc",
    maxWidth: "55%",
  },
  bubbleTailBorder: {
    position: "absolute",
    left: 10,
    bottom: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#ccc",
  },
  bubbleTailInner: {
    position: "absolute",
    left: 12,
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#fff",
  },
  notificationBubbleText: { fontSize: 10, color: "#333" },
  progressContainer: { width: "100%", marginTop: -20 },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  halfWidth: { flex: 1 },
  progressLabelContainer: { marginBottom: 6 },
  progressLabel: { fontSize: 12, fontWeight: "600", color: "#004D40" },
  progressMeter: {
    width: "100%",
    height: 16,
    backgroundColor: "rgb(247,253,253)",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
  },
  progressValue: {
    fontSize: 10,
    color: "#004D40",
    fontWeight: "600",
    position: "absolute",
    alignSelf: "center",
  },
  bottomSection: { flex: 1 },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#004D40" },
  counterContainer: {
    backgroundColor: "#FF5733",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: 8,
  },
  counterText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  horizontalScroll: { marginBottom: 10 },
  pillIcon: { width: 30, height: 14, borderRadius: 7, marginBottom: 6 },
  calendarIcon: {
    width: 36,
    height: 36,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  medicationCard: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  medicationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  appointmentCard: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  appointmentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  tooltip: {
    marginTop: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  tooltipText: { color: "#fff", fontSize: 10, fontWeight: "600" },

  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    width: "80%",
    borderRadius: 20,
    overflow: "hidden",
    transform: [{ scale: 1 }],
  },
  popupContent: {
    padding: 24,
    alignItems: "center",
  },
  coinIcon: {
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  popupTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#004D40",
    marginBottom: 8,
    textAlign: "center",
  },
  popupText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  redeemButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  redeemButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  redeemButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1001,
  },
});

export default HomeScreen;
