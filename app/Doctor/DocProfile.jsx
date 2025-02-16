import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DocProfile() {
  return (
    <SafeAreaView>
      <TextInput
      placeholder='Enter your Name'
      >

      </TextInput>
    </SafeAreaView>
  )
}