import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const SymptomsPage = () => {
    const [symptoms, setSymptoms] = useState([]);

    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/symptoms/");
                setSymptoms(response.data.symptoms); // Update the state with fetched data
            } catch (error) {
                console.error("Error fetching symptoms:", error);
            }
        };
        fetchSymptoms();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Symptoms</Text>
            {symptoms.map((symptom, index) => (
                <Text key={index} style={styles.symptom}>
                    {symptom}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    symptom: { fontSize: 18, marginBottom: 5 },
});

export default SymptomsPage;
