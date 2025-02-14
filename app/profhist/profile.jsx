import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";


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
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        dob: "1986-05-04",
        gender: "Male",
        condition: "Diabetes-Type 2",
        emergencyName: "Jane Doe",
        emergencyPhone: "+0987654321",
        emergencyRelation: "Spouse",
        profileImage: "https://th.bing.com/th/id/OIP.RnJxrWFyL3eU5OUVnecnTQHaHa?w=206&h=207&c=7&r=0&o=5&dpr=1.5&pid=1.7"
      };
      const router = useRouter();

    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Profile Details</Text>
                <View style={styles.profileSection}>
          {/* Display profile image */}
          <Image
            source={{ uri: profileData.profileImage }}
            style={styles.profileImage}
          />
        </View>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{profileData.name}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{profileData.email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{profileData.phone}</Text>
                <Text style={styles.label}>Date of Birth:</Text>
                <Text style={styles.value}>{profileData.dob}</Text>
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
                <TouchableOpacity style={styles.button} onPress={()=> router.push("history")}>
                  <Text style={styles.buttonText}>View Medical History</Text>

                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff5ee",
      padding: 20,
      paddingTop: 0
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
      alignItems: "center",
      marginBottom: 20,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60, 
      borderWidth: 2,
      borderColor: "#ddd",
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

    button: {
      backgroundColor: "#rgb(184, 158, 184)",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
      marginHorizontal: 80,
    },
    
    buttonText: {
      fontSize: 16,
      color: "#fff",
      alignContent: "center",
      fontWeight: "bold",
    }
  });

export default profilePage;