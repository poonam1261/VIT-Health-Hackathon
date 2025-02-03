import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import { Picker, PickerIOS } from '@react-native-picker/picker';

export default function survey() {

  const [currency, setCurrency] = useState('US Dollar');
  const formik = useFormik({
    initialValues:{
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

  });
  return (
    <View>
      <Text> Demo Form</Text>
      <View>
        <TextInput
        placeholder='Email'
        underlineColorAndroid={'black'}/>
        <TextInput
        secureTextEntry={true}
        placeholder='Password'
        underlineColorAndroid={'black'}
        />

        
        
       
      </View>
    </View>
  )
}