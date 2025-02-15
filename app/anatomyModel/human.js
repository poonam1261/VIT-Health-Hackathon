import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ThreeDModel from './anatomyModel/model';

const showModel = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ThreeDModel />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default showModel;
