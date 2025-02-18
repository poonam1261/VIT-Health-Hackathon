import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { API_BASE_URL } from "../config";

const { width } = Dimensions.get("window"); // Get device width for paging

const SymptomsDisplay = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/symptoms/1`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch symptoms');
        }

        const data = await response.json();

        if (!data.data || !data.data.symptom_data) {
          throw new Error('Invalid response format');
        }

        // Convert object to sorted array
        const sortedSymptoms = Object.entries(data.data.symptom_data)
          .map(([name, severity]) => ({ name, severity }))
          .sort((a, b) => b.severity - a.severity);

        setSymptoms(sortedSymptoms);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading symptoms...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Group symptoms into pages (3 symptoms per page)
  const groupedSymptoms = [];
  for (let i = 0; i < symptoms.length; i += 3) {
    groupedSymptoms.push(symptoms.slice(i, i + 3));
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="sick" size={40} color="#666" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>Current Symptoms</Text>
            <Text style={styles.subtitle}>Swipe to View More</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Swiping List */}
      <FlatList
        data={groupedSymptoms}
        keyExtractor={(item, index) => `page-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.page}>
            {item.map((symptom, index) => (
              <View key={index} style={styles.symptomItem}>
                <Text style={styles.symptomName}>{symptom.name}</Text>
                <View style={styles.severityContainer}>
                  <Text style={styles.severityText}>Severity:</Text>
                  <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(symptom.severity) }]}>
                    <Text style={styles.severityValue}>{symptom.severity}/10</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

// Function to determine severity color
const getSeverityColor = (severity) => {
  if (severity == 3) return '#FF6B6B';  // Red for high severity
  if (severity == 2) return '#FFB84D';  // Orange for medium severity
  return '#4CAF50';  // Green for low severity
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuButton: {
    padding: 5,
  },
  page: {
    width: width - 50, // Make sure each page takes full width (minus padding)
    justifyContent: "center",
  },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  symptomName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  severityIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityValue: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF6B6B',
    padding: 20,
  },
  noSymptomsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    padding: 20,
  },
});

export default SymptomsDisplay;
