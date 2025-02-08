import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const profilePage = ()=>{
    // const [name, getName] = useState("");
    // const [email, getEmail] = useState("");
    // const [phone, getPhone] = useState("");
    // const [dob, getDob] = useState("");
    // const [conditon, getCondition] = useState("");
    // const [ emergencyName, getEmergencyName] = useState("");
    // const [emergencyPhone, getEmergencyPhone] = useState("");
    // const [emergencyRelation, getEmergencyRelation] = useState("");
    // //add med history

    const profileData =  {
        name: "John Dodo",
        email: "john.doe@example.com",
        phone: "+1234567890",
        age: 69240,
        gender: "gae",
        condition: "ded",
        emergencyName: "Jane Doe",
        emergencyPhone: "+0987654321",
        emergencyRelation: "Spouse",
      };

    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Profile Details</Text>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{profileData.name}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{profileData.email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{profileData.phone}</Text>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{profileData.age}</Text>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.value}>{profileData.gender}</Text>

                <Text style={styles.label}>Condition:</Text>
                <Text style={styles.value}>{profileData.condition}</Text>

                <Text style={styles.title}>Emergency Contact Details</Text>
                <Text style={styles.label}>Emergency Name:</Text>
                <Text style={styles.value}>{profileData.emergencyName}</Text>
                <Text style={styles.label}>Emergency Phone:</Text>
                <Text style={styles.value}>{profileData.emergencyPhone}</Text>
                <Text style={styles.label}>Emergency Relation:</Text>
                <Text style={styles.value}>{profileData.emergencyRelation}</Text>

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#fff5ee",
      padding: 20,
    },
    title: {
      fontSize:16, 
      fontWeight:'bold', 
      color:'rgba(58, 22, 20, 0.74)', 
      alignSelf:'center', 
      marginBottom:20, 
      marginTop:10, 
      borderRadius:10, 
      paddingLeft:10, 
      paddingRight:10, 
      paddingTop:5, 
      paddingBottom:5,
      backgroundColor:'#f0e1b9', 
      alignSelf:'center', 
      textAlign:'center',
      elevation:10
    },
    profileSection: {
      marginBottom: 10,
      backgroundColor: "#f7f7f7",
      borderRadius: 10,
      padding: 15,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#555",
      marginBottom:1,
    },
    value: {
      fontSize: 16,
      color: "#333",
      marginBottom: 10,
    },
  });
  
  export default profilePage;