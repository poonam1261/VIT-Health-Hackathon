import React, { useState, useEffect, useRef, useCallback } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

const BlobAnimation = ({
  score,
  positionStyle,
  onScoreChange = () => {},
  isVisibleProp = true,
}) => {
  // Initialize score as null so we know when it's loaded from AsyncStorage.
  const [localScore, setScore] = useState(null);
  const [animationData, setAnimationData] = useState(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(isVisibleProp);

  // Load score from AsyncStorage; if not found, default to 0 (new user starts at 0)
  const loadScore = async () => {
    try {
      const storedScore = await AsyncStorage.getItem("healthScore");
      if (storedScore !== null) {
        setScore(parseInt(storedScore, 10));
      } else {
        setScore(0); // New user starts at 0
        await AsyncStorage.setItem("healthScore", "0");
      }
    } catch (error) {
      console.error("Error loading score:", error);
      setScore(0);
    }
  };

  // Decrease score every 120 seconds
  useEffect(() => {
    const decrementInterval = setInterval(async () => {
      setScore((prevScore) => {
        const newScore = Math.max(prevScore - 25, 0); // Ensure score doesn't go below 0
        AsyncStorage.setItem("healthScore", newScore.toString());
        return newScore;
      });
    }, 180000); // 120 seconds
    return () => clearInterval(decrementInterval);
  }, []);

  // Decrease score every 120 seconds
  useEffect(() => {
    const decrementInterval = setInterval(async () => {
      setScore((prevScore) => {
        const newScore = Math.max(prevScore - 25, 0); // Ensure score doesn't go below 0
        AsyncStorage.setItem("healthScore", newScore.toString());
        return newScore;
      });
    }, 180000); // 120 seconds
    return () => clearInterval(decrementInterval);
  }, []);

  // Combine score logic
  const combinedScore = score !== undefined ? score : localScore;

  // Update animation data based on score
  const updateAnimationData = () => {
    if (combinedScore == null) return; // Wait until we have a valid score
    let anim;
    if (combinedScore < 25) {
      anim = require("../assets/animations/angry.json");
    } else if (combinedScore < 50) {
      anim = require("../assets/animations/concerned.json");
    } else if (combinedScore < 75) {
      anim = require("../assets/animations/idle.json");
    } else {
      anim = require("../assets/animations/happy.json");
    }
    setAnimationData(anim);
  };

  useEffect(() => {
    updateAnimationData();
  }, [combinedScore]);

  // Notify parent if needed
  useEffect(() => {
    if (typeof onScoreChange === "function" && combinedScore != null) {
      onScoreChange(combinedScore);
    }
  }, [combinedScore, onScoreChange]);

  // Load the score on mount
  useEffect(() => {
    loadScore();
  }, []);

  // Every time the screen is focused, wait 100ms then reload the score
  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);
      setTimeout(() => {
        loadScore(); // Short delay to allow AsyncStorage update to complete
      }, 100);
      return () => setIsVisible(false);
    }, []),
  );

  // Don't render until localScore is loaded
  if (localScore === null) return null;

  return (
    <View
      style={{
        ...positionStyle, // Accept dynamic positioning
        width: 250,
        height: 250,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {isVisible && animationData && (
        <LottieView
          ref={animationRef}
          source={animationData}
          autoPlay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </View>
  );
};

export default BlobAnimation;
