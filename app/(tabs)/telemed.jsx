import { View, Text, StyleSheet, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fontisto from '@expo/vector-icons/Fontisto';
import { appointments, doctors } from '../../constants/DoctorContacts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import { ScrollView } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import { db } from '../../firebase/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';



export default function TeleMed() {
  const db = getFirestore(app);


  
const Item = ({item}) => (
    
  <View style={styles.doctorContainer}>
      <View style={styles.doctorItem}>
      <View style={{display:'flex', flexDirection:'row'}}>
      <FontAwesome6 name="user-doctor" size={50} color="white" style={{marginLeft:10}} />
      <Text style={styles.doctorName}>{item.name}</Text>
      </View>
      <Text style={styles.doctorQual}>{item.qual}</Text>
      
      </View>
      <TouchableOpacity style={styles.bookApt}><Text style={{color:'white', fontWeight:'bold'}} onPress={() => {handleBookApt(item)}}>Book an Appointment</Text></TouchableOpacity>
  
  </View>
);

  
const AptItem = ({item}) => (
    
  <TouchableOpacity style={styles.AptContainer}>
      <View style={styles.AptItem}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',}}>
        <Octicons name="note" size={30} color="#5b4d54" />
        <Text style={styles.AptDate}>Monday, 03-02-2025</Text>
        </View>
        <Text style={styles.AptTime}>13:00</Text>
      </View>
      <View style={styles.seperator}>
         
      </View>
      <Text style={styles.doctorNameApt}>{item.name}</Text>
  </TouchableOpacity>
);

const renderItem = ({item}) => <Item item={item} />;
const renderItemDr = ({item}) => <AptItem item={item}/>
    const router = useRouter();

    const handleBookApt = (item) => {

      router.push('Appointment/bookAppt')
       
    }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tele Medicine</Text>
      </View>
      

      <ScrollView >
      <View style={styles.message}>
        <Image source={require('../../assets/images/doctorImg.png')} style={styles.doctorImg}/>
      <Text style={styles.messageText}>Hi John, how are you feeling?</Text>
      </View>

      <TouchableOpacity style={styles.survey} onPress={() => {router.push('SymptomScreen')}}>                        {/* changed */}
        <Text style={styles.surveyText}>Take Up Medical Survey</Text>
        <Feather name="arrow-right-circle" size={30} color="white" />
     </TouchableOpacity>

      <View>
       <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
       <Text style={styles.aptHead}>
          Today's Appointments
        </Text>
        <Foundation name="calendar" size={45} color="#5b4d54" style={styles.calendarIcon} onPress={() => {router.push('calendar/calendarApp')}}/>
       </View>

        <FlatList
        data={appointments}
        renderItem={renderItemDr}
        keyExtractor={item => item.id}
        />
      </View>

     
     <Text style={styles.aptHead}>Book Appointment</Text>

      <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />
      </ScrollView>
        
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
    header:{
      display:'flex',
      flexDirection:'row',
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#FFBFCC',
      justifyContent:'center',
      paddingLeft:10,
      paddingRight:10,
      
    },
    headerText:{
    
      fontSize:24,
      fontWeight:'bold',
      alignSelf:'center',
      color:'#fff'

    },
    message:{
        padding:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20, 
        borderWidth:4, 
        margin:10, 
        borderBottomRightRadius:25, 
        borderBottomLeftRadius:25, 
        borderTopRightRadius:25, 
        borderColor:'rgba(255, 255, 255, 0.55)', 
        marginTop:15, 
        elevation:20, 
        backgroundColor:'#8c7a92'
    },
    messageText:{
        fontSize:20,
        fontWeight:'600',
        color:'rgba(255,255,255, 0.7)',
        marginLeft:10

    },
    doctorItem:{
        display:'flex',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:10,
        marginRight:10,
        marginTop:10,

    },
    doctorName:{
        fontSize:20,
        fontWeight:'600',
        marginRgiht:10,
        color:'white',
        marginLeft:20

    },
    doctorNameApt:{
      fontSize:17,
      fontWeight:'500',
      marginRgiht:10,
      color:'black',
      marginLeft:20

  },
    doctorQual:{
        fontSize:15,
        fontWeight:'bold',
        color:'white',
        marginRight:20,
        alignSelf:'flex-start'

    },
    doctorImg:{
        height:80,
        width:80,
        resizeMode:'contain'
    }, 
    doctorContainer:{
        backgroundColor:'#b6dc76',
        marginLeft:10,
        marginRight:10,
        borderRadius:15,
        paddingBottom:20, 
        marginBottom:10

    },
    bookApt:{
        alignSelf:'flex-end', 
        marginRight:10,
        marginBottom:10,
        padding:10,
        backgroundColor:'rgba(0,0,0,0.2)',
        borderRadius:10,
        color:'white', 
        fontSize:15, 
        position:'absolute',
        top:'60%',
        right:4
    },
    survey:{
        marginLeft:10,
        marginRight:10,
        padding:10,
        borderRadius:15, 
        backgroundColor:'#a3a9cf', 
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        paddingRight:20, 
        paddingLeft:20, 
        marginTop:20,
        marginBottom:20
    }, 
    surveyText:{
        color:'white', 
        marginLeft:10, 
        fontSize:18,
        fontWeight:'600',
        textAlign:'center'
    }, 
    aptHead:{
      fontSize:16, 
      fontWeight:'bold', 
      color:'rgba(58, 22, 20, 0.74)', 
      alignSelf:'center', 
      marginBottom:10, 
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
    AptDate:{
      fontSize:15,
        fontWeight:'bold',
        color:'rgba(26, 153, 17, 0.92)',
        marginLeft:15

    }, 
    AptItem:{
      display:'flex',
        flexDirection:'row',
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'space-between',
        marginLeft:10,
        marginRight:10,
       
        alignItems:'center'
    }, 
    AptContainer:{
      backgroundColor:'rgb(255, 255, 255)',
      marginLeft:10,
      marginRight:10,
      borderRadius:15,
      paddingBottom:20, 
      marginBottom:10, 
      borderWidth:1,
      elevation:5, 
      borderColor:'rgba(50, 66, 61, 0.91)'
      
      

  },
  AptTime:{
    fontSize:15,
    fontWeight:'bold',
    color:'rgba(26, 153, 17, 0.92)'

  }, 
  calendarIcon:{
    position:'absolute', 
    right:0, 
    marginRight:20
  }, 
  seperator:{
    width:'95%', 
    height:1,
    backgroundColor:'rgba(237, 103, 103, 0.87)' , 
    margin:10

  }

  })