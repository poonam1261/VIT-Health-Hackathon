import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    // Load saved coins when app starts
    loadCoins();
  }, []);

  const loadCoins = async () => {
    try {
      const savedCoins = await AsyncStorage.getItem("coins");
      if (savedCoins !== null) {
        setCoins(parseInt(savedCoins));
      }
    } catch (error) {
      console.error("Error loading coins:", error);
    }
  };

  const addCoins = async (amount) => {
    try {
      const newTotal = coins + amount;
      setCoins(newTotal);
      await AsyncStorage.setItem("coins", newTotal.toString());
    } catch (error) {
      console.error("Error saving coins:", error);
    }
  };

  const subCoins = async (amount) => {
    try {
      const newTotal = coins - amount;
      setCoins(newTotal);
      await AsyncStorage.setItem("coins", newTotal.toString());
    } catch (error) {
      console.error("Error saving coins:", error);
    }
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, subCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error("useCoins must be used within a CoinsProvider");
  }
  return context;
};
