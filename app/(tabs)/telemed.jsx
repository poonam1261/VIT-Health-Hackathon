import { View, Text, StyleSheet, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fontisto from '@expo/vector-icons/Fontisto';
import { doctors } from '../../constants/DoctorContacts';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import { ScrollView } from 'react-native';

const Item = ({item}) => (
    
    <View style={styles.doctorContainer}>
        <View style={styles.doctorItem}>
        <View style={{display:'flex', flexDirection:'row'}}>
        <FontAwesome6 name="user-doctor" size={50} color="white" style={{marginLeft:10}} />
        <Text style={styles.doctorName}>{item.name}</Text>
        </View>
        <Text style={styles.doctorQual}>{item.qualification}</Text>
        
        </View>
        <TouchableOpacity style={styles.bookApt}><Text style={{color:'white', fontWeight:'bold'}}>Book an Appointment</Text></TouchableOpacity>
    
    </View>
);

const AptItem = ({item}) => (
    
  <TouchableOpacity style={styles.AptContainer}>
      <View style={styles.AptItem}>
      <View style={{display:'flex', flexDirection:'row'}}>
      <Octicons name="note" size={30} color="white" />
      <Text style={styles.doctorName}>{item.name}</Text>
      </View>
      <Text style={styles.AptDate}>Monday, 03-02-2025</Text>
      
      
      </View>
      <Text style={styles.AptTime}>13:00</Text>
  </TouchableOpacity>
);

const renderItem = ({item}) => <Item item={item} />;
const renderItemDr = ({item}) => <AptItem item={item}/>
export default function TeleMed() {
    const router = useRouter();
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tele Medicine</Text>
      </View>

      <ScrollView >
      <View style={styles.message}>
        <Image source={require('../../assets/images/doctorImg.png')} style={styles.doctorImg}/>
      <Text style={styles.messageText}>Hi John, how are you{'\n'}feeling?</Text>
      </View>

      <View>
        <Text style={styles.aptHead}>
          Appointments
        </Text>

        <FlatList
        data={doctors}
        renderItem={renderItemDr}
        keyExtractor={item => item.id}
        />
      </View>

      <TouchableOpacity style={styles.survey} onPress={() => {router.push('survey')}}>
        <Text style={styles.surveyText}>Take Up Medical Survey</Text>
        <Feather name="arrow-right-circle" size={30} color="white" />
     </TouchableOpacity>

     <Text style={styles.aptHead}>Book An Appointment</Text>

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
        paddingLeft:20, 
        borderWidth:2, 
        margin:10, 
        borderBottomRightRadius:25, 
        borderBottomLeftRadius:25, 
        borderTopRightRadius:25, 
        borderColor:'rgba(10,0,255, 0.9)', 
        marginTop:15, 
    },
    messageText:{
        fontSize:25,
        fontWeight:'600',
        color:'rgba(100,100,255, 0.6)',
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
        backgroundColor:'rgba(10,0,255, 0.5)',
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
        backgroundColor:'rgba(100,30,240,0.5)', 
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
      fontSize:24, 
      fontWeight:'bold', 
      color:'rgba(0,0,255,0.8)', 
      alignSelf:'center', 
      marginBottom:10, 
      marginTop:10, 
      borderRadius:10, 
      paddingLeft:10, 
      paddingRight:10, 
      paddingTop:5, 
      paddingBottom:5,
      backgroundColor:'rgba(58,100,255, 0.3)'
    }, 
    AptDate:{
      fontSize:15,
        fontWeight:'bold',
        color:'white',
        marginRight:20,
        alignSelf:'flex-start'

    }, 
    AptItem:{
      display:'flex',
        flexDirection:'row',
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:10,
        marginRight:10,
       
        alignItems:'center'
    }, 
    AptContainer:{
      backgroundColor:'rgba(10,0,255, 0.3)',
      marginLeft:10,
      marginRight:10,
      borderRadius:15,
      paddingBottom:20, 
      marginBottom:10, 
      

  },
  AptTime:{
    alignSelf:'flex-end',
    marginRight:40,
    fontSize:15,
    fontWeight:'bold',
    color:'white'

  }

  })