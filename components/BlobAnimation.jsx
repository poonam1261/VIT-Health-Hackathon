import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { useFocusEffect } from '@react-navigation/native';

const BlobAnimation = ({ positionStyle, onScoreChange = () => {} }) => {
  const [happinessScore, setHappinessScore] = useState(0);
  const [score, setScore] = useState(0);  // Start at 25 by default
  const [animationData, setAnimationData] = useState(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Load score from AsyncStorage
  const loadScore = async () => {
    try {
      const storedScore = await AsyncStorage.getItem("healthScore");
      if (storedScore !== null) {
        setScore(parseInt(storedScore, 10));
      } else {
        // User has never used the app; initialize score to 25
        setScore(25);
        await AsyncStorage.setItem("healthScore", "25");
      }
    } catch (error) {
      console.error("Error loading score:", error);
    }
  };

  // Run loadScore once when the component mounts
  useEffect(() => {
    loadScore();
  }, []);

  // ADDED: Re-load the score from AsyncStorage whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadScore();
    }, [])
  );

  // Decrease score every 120 seconds
  useEffect(() => {
    const decrementInterval = setInterval(async () => {
      setScore((prevScore) => {
        const newScore = Math.max(prevScore - 25, 0); // Ensure score doesn't go below 0
        AsyncStorage.setItem("healthScore", newScore.toString());
        return newScore;
      });
    }, 120000); // 120 seconds
    return () => clearInterval(decrementInterval);
  }, []);

  // Update animation data based on score
  const updateAnimationData = () => {
    let anim;
    if (score < 25) {
      anim = require("../assets/animations/angry.json");
    }else if (score < 50) {
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

  // Use useFocusEffect to control visibility
  useFocusEffect(
    useCallback(() => {
      loadScore();
      setIsVisible(true);
      return () => setIsVisible(false); // Hide when losing focus
    }, [])
  );

  useEffect(() => {
    if (typeof onScoreChange === "function") {
      onScoreChange(score);
    }
    console.log("Score changed:", score);
  }, [score, onScoreChange]);

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
