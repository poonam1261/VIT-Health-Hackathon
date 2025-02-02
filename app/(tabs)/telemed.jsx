import { View, Text, StyleSheet, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fontisto from '@expo/vector-icons/Fontisto';
import { doctors } from '../../constants/DoctorContacts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Item = ({item}) => (
    <View style={styles.doctorContainer}>
        <View style={styles.doctorItem}>
        <View style={{display:'flex', flexDirection:'row'}}>
        <FontAwesome6 name="user-doctor" size={50} color="white" style={{marginLeft:10}} />
        <Text style={styles.doctorName}>{item.name}</Text>
        </View>
        <Text style={styles.doctorQual}>{item.qualification}</Text>
        
        </View>
        <TouchableOpacity style={styles.bookApt}><Text style={{color:'white'}}>Book Appointment</Text></TouchableOpacity>
    
    </View>
);

const renderItem = ({item}) => <Item item={item} />;

export default function TeleMed() {
  return (
    <SafeAreaView style={{backgroundColor:'white', height:'100%'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tele Medicine</Text>
      </View>
      <View style={styles.message}>
        <Image source={require('../../assets/images/doctorImg.png')} style={styles.doctorImg}/>
      <Text style={styles.messageText}>Hi John, how are you{'\n'}feeling?</Text>
      </View>

      <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />
        
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
      justifyContent:'center',
      paddingLeft:10,
      paddingRight:10,
      
    },
    headerText:{
    
      fontSize:24,
      fontWeight:'bold',
      alignSelf:'center',
      color:'white'

    },
    message:{
        padding:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20
    },
    messageText:{
        fontSize:25,
        fontWeight:'600',
        color:'rgba(0,0,255, 0.7)',
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
    doctorQual:{
        fontSize:15,
        fontWeight:'500',
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
        backgroundColor:'rgba(10,0,255, 0.5)',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        borderRadius:15,
        paddingBottom:20

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
    }

  })