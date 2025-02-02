import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <View style={{alignSelf:'flex-end'}}>
        <MaterialCommunityIcons name="face-man-profile" size={34} color="black" />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  header:{
    display:'flex',
    flexDirection:'row',
    //alignItems:'center',
    
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'rgba(0,0,0,0.3)',
    elevation:10,
    justifyContent:'space-between',
    paddingLeft:10,
    paddingRight:10,
    
    
  },
  headerText:{
    position:'relative',
    left:'40%',
    fontSize:24,
    fontWeight:'bold',
    alignSelf:'center'
  }
})