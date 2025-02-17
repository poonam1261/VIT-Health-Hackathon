import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    primary: 'rgb(255, 45, 85)',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={MyTheme}>
      <Stack>
        <Stack.Screen name="Login_Register/LoginPage" options={{ headerShown: false }} />
        <Stack.Screen name="Doctor/DocAppts" options={{ headerShown: false }} />
        <Stack.Screen name="Doctor/Prescription" options={{ title:'Add Prescription' }} />
        <Stack.Screen name="Doctor/showPrescription" options={{ title :'Prescription Details' }} />
        <Stack.Screen name="Doctor/allPrescriptions" options={{ title :'All Prescription' }} />
        <Stack.Screen name="Login_Register/DoctorLogin" options={{ headerShown: false }} />
        <Stack.Screen name="InitialPage" options={{ headerShown: false }} />
        <Stack.Screen name="Login_Register/RegisterPage" options={{ headerShown: false }} />
        <Stack.Screen name="Login_Register/DoctorRegistration" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="VoiceAssistance" />
        <Stack.Screen name="survey" />
        <Stack.Screen name="calendar/calendarApp" options={
          {
            title:'Your Appointments'
          }
        } />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
