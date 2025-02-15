import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Animated,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <Ionicons name="calendar" size={24} color="white" />
  </LinearGradient>
);

const NotificationIcon = () => (
  <LinearGradient
    colors={["rgb(172, 170, 176)", "rgb(211, 183, 214)"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={styles.notificationIcon}
  >
    <Ionicons name="notifications" size={16} color="white" />
  </LinearGradient>
);

// UPDATED: NotificationItem now includes swipeable functionality
const NotificationItem = ({ text, onDelete }) => {
  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.notificationCard}>
        <Text style={styles.notificationCardText} numberOfLines={2}>
          {text}
        </Text>
      </View>
    </Swipeable>
  );
};

const MedicationCard = ({ tooltipText, cardWidth }) => {
  const router = useRouter();
  const [tooltipVisible, setTooltipVisible] = useState(false);
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

const RightColumnContent = ({
  notifications,
  onDeleteNotification,
  medicationData,
  appointmentData,
  showNotifications,
  setShowNotifications,
  showMedications,
  setShowMedications,
  showAppointments,
  setShowAppointments,
  allCollapsed,
}) => {
  const [medCardWidth, setMedCardWidth] = useState(0);
  const [appCardWidth, setAppCardWidth] = useState(0);
  const toggleSection = (setter, value) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setter(!value);
  };
  return (
    <View style={styles.rightColumnContent}>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => toggleSection(setShowNotifications, showNotifications)}
      >
        <Text style={styles.dropdownHeaderText}>Notifications</Text>
        <Text style={styles.dropdownHeaderText}>
          {showNotifications ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      {showNotifications &&
        notifications.map((item, index) => (
          <NotificationItem
            key={index}
            text={item}
            onDelete={() => onDeleteNotification(item)}
          />
        ))}
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => toggleSection(setShowMedications, showMedications)}
      >
        <Text style={styles.dropdownHeaderText}>Medications</Text>
        <Text style={styles.dropdownHeaderText}>
          {showMedications ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      {showMedications && (
        <View onLayout={(e) => setMedCardWidth(e.nativeEvent.layout.width)}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {medicationData.map((item) => (
              <MedicationCard
                key={item.id}
                tooltipText={item.tooltipText}
                cardWidth={medCardWidth}
              />
            ))}
          </ScrollView>
        </View>
      )}
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => toggleSection(setShowAppointments, showAppointments)}
      >
        <Text style={styles.dropdownHeaderText}>Appointments</Text>
        <Text style={styles.dropdownHeaderText}>
          {showAppointments ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      {showAppointments && (
        <View onLayout={(e) => setAppCardWidth(e.nativeEvent.layout.width)}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {appointmentData.map((item) => (
              <AppointmentCard
                key={item.id}
                tooltipText={item.tooltipText}
                timeIndicator={item.timeIndicator}
                cardWidth={appCardWidth}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {allCollapsed && (
        <View style={styles.stayHealthyContainer}>
          <Text style={styles.stayHealthyText}>Stay healthy!</Text>
        </View>
      )}
    </View>
  );
};

export default function index() {
  const router = useRouter();

  const [notifications, setNotifications] = useState([
    "💧 Stay hydrated! Drink a glass of water.",
    "🏃‍♂️ Time for a quick stretch!",
    "🍎 Eat a healthy snack.",
    "📅 Appointment at 3 PM",
    "🚴‍♂️ Go for a bike ride!",
  ]);
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

  const [showNotifications, setShowNotifications] = useState(true);
  const [showMedications, setShowMedications] = useState(true);
  const [showAppointments, setShowAppointments] = useState(true);
  const allCollapsed =
    !showNotifications && !showMedications && !showAppointments;

  const [meterWidth, setMeterWidth] = useState(0);
  const happinessAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(happinessAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);
  const fillWidth = happinessAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, meterWidth * 0.85],
  });

  const handleDeleteNotification = (notificationText) => {
    setNotifications(notifications.filter((item) => item !== notificationText));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Home</Text>
          <View style={styles.profileIcon} onPress ={()=>router.push("profhist/profile")}>
            <MaterialCommunityIcons
              name="face-man-profile"
              size={34}
              color="white"
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.leftColumn}>
            <View style={styles.virtualPetContainer}>
              <Text style={styles.virtualPetText}>Peelu here?</Text>
            </View>
            <View style={styles.happinessContainer}>
              <Text style={styles.happinessTitle}>Happiness Meter</Text>
              <View
                style={styles.happinessMeter}
                onLayout={(e) => setMeterWidth(e.nativeEvent.layout.width)}
              >
                <Animated.View
                  style={[styles.happinessFill, { width: fillWidth }]}
                />
                <Text style={styles.happinessValue}>75%</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightColumn}>
            <ScrollView contentContainerStyle={styles.rightColumnContent}>
              <RightColumnContent
                notifications={notifications}
                onDeleteNotification={handleDeleteNotification}
                medicationData={medicationData}
                appointmentData={appointmentData}
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
                showMedications={showMedications}
                setShowMedications={setShowMedications}
                showAppointments={showAppointments}
                setShowAppointments={setShowAppointments}
                allCollapsed={allCollapsed}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  // header: {
  //   backgroundColor: "#829582",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   padding: 15,
  // },

  header: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#829582",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
},
  headerText: { fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff", },

  mainContainer: { flex: 1, flexDirection: "row", padding: 10, },
  leftColumn: {
    flex: 1,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  virtualPetContainer: {
    width: "90%",
    height: 350,
    backgroundColor: "rgb(238, 238, 250)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  virtualPetText: { fontSize: 22, fontWeight: "bold", color: "#004D40" },
  happinessContainer: {
    width: "90%",
    backgroundColor: "rgb(226, 246, 226)",
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
  },
  happinessTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#004D40",
  },
  happinessMeter: {
    width: "100%",
    height: 30,
    backgroundColor: "rgb(247, 253, 253)",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  happinessFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    backgroundColor: "rgb(137, 185, 180)",
  },
  happinessValue: { fontSize: 14, color: "#004D40", fontWeight: "600" },
  rightColumn: { flex: 1, paddingLeft: 10 },
  rightColumnContent: { paddingBottom: 20 },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownHeaderText: { fontSize: 16, fontWeight: "600", color: "#004D40" },
  notificationsListContainer: { marginVertical: 8 },
  notificationStackContainer: { height: 330, marginVertical: 8 },
  notificationStackContent: { paddingVertical: 10 },
  notificationItemContainer: { height: 220, marginBottom: 10 },
  verticalArrowContainer: { alignItems: "center", marginTop: 5 },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    backgroundColor: "rgb(242, 235, 237)",
    borderRadius: 20,
    borderWidth: 0.1,
    marginVertical: 2,
    borderColor: "#000",
  },
  notificationCardText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    //marginTop: 10,
    padding: 12,
  },
  notificationIcon: {
    width: 20,
    height: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  deckContainer: { paddingHorizontal: 8 },
  medicationCard: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  medicationText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  appointmentCard: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  appointmentText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  pillIcon: { width: 40, height: 20, borderRadius: 10, marginBottom: 10 },
  calendarIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: {
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tooltipText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  stayHealthyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
  },
  stayHealthyText: {
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "300",
    color: "#004D40",
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 30,
    height: "100%",
  },
  deleteText: { color: "white", fontWeight: "600", padding: 20 },
  profileIcon: {
    right: 0,
    alignSelf: "flex-end",
  },
});
