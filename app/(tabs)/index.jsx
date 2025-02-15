import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function index() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <View style={{alignSelf:'flex-end'}}>
        <MaterialCommunityIcons name="face-man-profile" size={34} color="white" />

        </View>
       
      </View>
      
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  header:{
    display:'flex',
    flexDirection:'row',
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'rgba(0,0,255,0.3)',
    elevation:10,
    paddingLeft:10,
    paddingRight:10,
    textAlign:'center', 
    justifyContent:'center',
    width:'100%'
    
  },
  headerText:{
  
    fontSize:24,
    fontWeight:'bold',
    alignSelf:'center',
    color:'white',
    

  },
  profileIcon:{
    right:0,
    alignSelf:'flex-end'
  }
  
})