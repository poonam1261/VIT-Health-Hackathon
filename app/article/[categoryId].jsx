import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import articleData from "./ArticleData.json";
import { Ionicons } from '@expo/vector-icons';  // Importing Ionicons for back icon

export default function ArticleScreen() {
  const { categoryId } = useLocalSearchParams();
  const navigation = useNavigation();
  const article = articleData[categoryId];
  console.log("categoryId:", categoryId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    });
  }, [navigation]);

  const goBack = () => {
    navigation.goBack();
  };

  if (!article) {
    return (
      <LinearGradient colors={["#dac6be", "#ccb0a4", "#bd9989"]} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Article Not Found</Text>
          </View>
          <ScrollView contentContainerStyle={styles.errorContainer}>
            <Text style={styles.error}>Article content not available</Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#dac6be", "#ccb0a4", "#bd9989"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{article.title}</Text>
        </View>
        <ScrollView style={styles.articleContainer}>
          <Text style={styles.meta}>
            By {article.author} | {article.date}
          </Text>
          {article.content.map((section, index) => {
            if (section.type === 'header') {
              return <Text key={index} style={styles.sectionHeader}>{section.text}</Text>;
            }
            return <Text key={index} style={styles.paragraph}>{section.text}</Text>;
          })}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ae887b",
    elevation: 5,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    textAlign: 'center',
  },
  articleContainer: {
    flex: 1,
    padding: 20,
  },
  meta: {
    fontSize: 16,
    color: "#4a4a4a",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c2c2c",
    marginBottom: 15,
    marginTop: 25,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 15,
  },
  errorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    color: "#721c24",
    textAlign: "center",
    marginTop: 40,
  },
});
