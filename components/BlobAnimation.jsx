import React, { useState, useEffect, useRef, useCallback } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

const BlobAnimation = ({ positionStyle, onScoreChange = () => {} }) => {
  // Initialize score as null so we know when it's loaded from AsyncStorage.
  const [score, setScore] = useState(null); // CHANGED: initial state from 0 to null
  const [animationData, setAnimationData] = useState(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Load score from AsyncStorage; if not found, default to 0 (new user starts at 0)
  const loadScore = async () => {
    try {
      const storedScore = await AsyncStorage.getItem("healthScore");
      console.log("Stored score:", storedScore); // DEBUG
      if (storedScore !== null) {
        setScore(parseInt(storedScore, 10));
      } else {
        setScore(0); // New user starts at 0
        await AsyncStorage.setItem("healthScore", "0");
        console.log("No stored score found. Setting score to 0"); // DEBUG
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

  // Load the score on mount
  useEffect(() => {
    loadScore();
  }, []);

  // Every time the screen is focused, wait 100ms then reload the score
  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);
      setTimeout(() => {
        loadScore(); // ADDED: short delay to allow AsyncStorage update to complete
      }, 100);
      return () => setIsVisible(false);
    }, []),
  );

  // Update animation data based on score (only runs once score is loaded)
  const updateAnimationData = () => {
    if (score === null) return; // Do nothing if score isn't loaded yet
    let anim;
    if (score < 25) {
      anim = require("../assets/animations/angry.json");
    } else if (score < 50) {
      anim = require("../assets/animations/concerned.json");
    } else if (score < 75) {
      anim = require("../assets/animations/idle.json");
    } else {
      anim = require("../assets/animations/happy.json");
    }
    setAnimationData(anim);
  };

  useEffect(() => {
    updateAnimationData();
  }, [score]);

  // Notify parent of score changes
  useEffect(() => {
    if (typeof onScoreChange === "function" && score !== null) {
      onScoreChange(score);
    }
    console.log("Score changed:", score); // DEBUG
  }, [score, onScoreChange]);

  // Only render once the score is loaded
  if (score === null) return null; // CHANGED: Wait for score to load

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
