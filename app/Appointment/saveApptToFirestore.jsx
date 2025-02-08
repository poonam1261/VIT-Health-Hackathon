import { View, Text } from 'react-native'
import React from 'react'
import { db } from '../../firebase/firebaseConfig'

export default function saveApptToFirestore(doctor, selectedDate, hour) {

    const snapshot = getDocs(collection(db, "Doctors"));
}