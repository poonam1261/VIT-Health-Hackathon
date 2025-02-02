import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Formik, useFormik } from 'formik'

export default function survey() {

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
      <Formik>
        <Text>
          Hello
        </Text>
      </Formik>
    </View>
  )
}