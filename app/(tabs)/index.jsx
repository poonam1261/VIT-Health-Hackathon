import React, { useState, useRef, useEffect } from "react";
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

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

const MedicationCard = ({ tooltipText, cardWidth }) => {
  const router = useRouter();
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
        colors={["#ffffff", "#f7f7f7"]}
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

const AppointmentCard = ({ tooltipText, timeIndicator, cardWidth }) => {
  const router = useRouter();
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
  const router = useRouter();

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
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [notificationExpanded, setNotificationExpanded] = useState(false);

  const notificationScale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.spring(notificationScale, {
      toValue: notificationExpanded ? 1.05 : 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [notificationExpanded]);

  const [tasksCompleted, setTasksCompleted] = useState(0);
  const initialTaskCount = useRef(notificationList.length);
  const [happinessValue, setHappinessValue] = useState(0.75);

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
  const happinessAnim = useRef(new Animated.Value(happinessValue)).current;
  useEffect(() => {
    Animated.timing(happinessAnim, {
      toValue: happinessValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [happinessValue]);

  const fillWidth = happinessAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, meterWidth],
  });

  const handleTaskDone = () => {
    setTasksCompleted((prev) => prev + 1);
    setHappinessValue((prev) => Math.min(prev + 0.1, 1));
    removeCurrentNotification();
  };

  const handleTaskIgnored = () => {
    setHappinessValue((prev) => Math.max(prev - 0.1, 0));
    removeCurrentNotification();
  };

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
          <TouchableOpacity onPress={() => router.push("profhist/profile")}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://th.bing.com/th/id/OIP.RnJxrWFyL3eU5OUVnecnTQHaHa?w=206&h=207&c=7&r=0&o=5&dpr=1.5&pid=1.7",
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.mainContainer}>
          <View style={styles.topSection}>
            <View style={styles.petAndNotificationContainer}>
              <View style={styles.petWrapper}>
                <BlobAnimation
                  isVisible={true}
                  positionStyle={{ alignSelf: "center", position: "relative" }}
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
              <View style={styles.progressBar}>
                <Text style={styles.progressLabel}>Tasks</Text>
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
              <View style={styles.progressBar}>
                <Text style={styles.progressLabel}>Happiness</Text>
                <View style={styles.progressMeter}>
                  <Animated.View style={{ width: fillWidth, height: "100%" }}>
                    <LinearGradient
                      colors={["#81C784", "#388E3C"]}
                      style={{ flex: 1, borderRadius: 8 }}
                    />
                  </Animated.View>
                  <Text style={styles.progressValue}>
                    {Math.round(happinessValue * 100)}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Medications</Text>
              <View style={styles.counterContainer}>
                <Text style={styles.counterText}>{medicationData.length}</Text>
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
                />
              ))}
            </ScrollView>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Appointments</Text>
              <View style={styles.counterContainer}>
                <Text style={styles.counterText}>{appointmentData.length}</Text>
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
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
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
  profileIcon: { alignSelf: "flex-end" },
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
  progressBar: { marginVertical: 6 },
  progressLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#004D40",
    marginBottom: 4,
  },
  progressMeter: {
    width: "100%",
    height: 16,
    backgroundColor: "rgb(247,253,253)",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
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
});

export default HomeScreen;
