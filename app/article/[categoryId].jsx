import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import articleData from "./ArticleData.json";  // ✅ Fixed import

export default function ArticleScreen() {
  const { categoryId } = useLocalSearchParams(); // ✅ Correctly extract params
  const article = articleData[categoryId]; // ✅ Get the correct article
  console.log("categoryId:", categoryId);


  if (!article) {
    return (
      <LinearGradient colors={["#dac6be", "#ccb0a4", "#bd9989"]} style={styles.container}>
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.headerText}>Article Not Found</Text>
          </View>
          <ScrollView>
            <Text style={styles.error}>Article content not available</Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#dac6be", "#ccb0a4", "#bd9989"]} style={styles.container}>
      <SafeAreaView>
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
  header: {
    paddingVertical: 10,
    backgroundColor: "#ae887b",
    alignItems: "center",
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  articleContainer: {
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
  error: {
    fontSize: 18,
    color: "#721c24",
    textAlign: "center",
    marginTop: 40,
  },
});
