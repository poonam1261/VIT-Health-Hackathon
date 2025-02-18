import React, { useState, useRef } from "react";
import { View, Button, Text, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function VoiceAssistance() {
    const [recording, setRecording] = useState(null);
    const [transcription, setTranscription] = useState("Tap 'Start' to record");
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const navigation = useNavigation();
    const router = useRouter();
    const [isRecording, setIsRecording] = useState(false); 

    // 🎤 Start Recording (Handles Web & Native)
    const startRecording = async () => {
        setIsRecording(true);
        if (Platform.OS === "web") {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                audioChunks.current = [];
    
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
    
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.current.push(event.data);
                };
    
                mediaRecorder.start();
    
                console.log("🎙️ Web Recording started...");
    
                // Set a threshold for silence (in dB)
                const silenceThreshold = 10; // 10 dB
                const silenceDuration = 2000; // 2 seconds
    
                let silenceTimer = null;
                const checkSilence = () => {
                    analyser.getByteFrequencyData(dataArray);
    
                    // Check if the volume is below the silence threshold
                    const averageVolume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    
                    if (averageVolume < silenceThreshold) {
                        if (!silenceTimer) {
                            silenceTimer = setTimeout(() => {
                                stopRecording(); // Stop recording after the silence threshold is met
                            }, silenceDuration);
                        }
                    } else {
                        clearTimeout(silenceTimer); // Reset timer if sound is detected
                        silenceTimer = null;
                    }
    
                    // Keep checking for silence
                    requestAnimationFrame(checkSilence);
                };
    
                checkSilence();
            } catch (error) {
                console.error("❌ Web Recording failed:", error);
            }
        }
    };
    
    // 🛑 Stop Recording (Handles Web & Native)
    const stopRecording = async () => {
        setIsRecording(false);
        if (Platform.OS === "web") {
            if (!mediaRecorderRef.current) return;

            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
                const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });

                console.log("🔄 Sending Web Audio...");
                sendAudioToServer(audioFile);
            };
        } else {
            if (!recording) return;

            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log("📂 Recorded File:", uri);

            if (!uri) {
                console.error("❌ No file generated!");
                return;
            }

            const fileInfo = await FileSystem.getInfoAsync(uri);
            sendAudioToServer(fileInfo.uri);
        }
    };

    // 📤 Send Audio to Backend
    const sendAudioToServer = async (audio) => {
        const formData = new FormData();

        if (Platform.OS === "web") {
            formData.append("audio", audio);
        } else {
            formData.append("audio", {
                uri: audio,
                type: "audio/x-wav",
                name: "recording.wav"
            });
        }

        try {
            const response = await fetch("http://localhost:3000/speech-to-text", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("✅ Server Response:", data);
            setTranscription(data.transcript || "No transcription found.");

            if(data.transcript.trim() != ""){
                console.log("Transcription: ", data.transcript);

                if(data.transcript.toLowerCase().includes("medicine")) {
                    console.log("Tele");
                    router.push('(tabs)/telemed')
                }

                if(data.transcript.toLowerCase().includes("dashboard") || data.transcript.toLowerCase().includes("dash")) {
                    console.log("Meddash");
                    router.push('(tabs)/meddash')
                }

                if(data.transcript.toLowerCase().includes("calendar")) {
                    console.log("calendar");
                    router.push('calendar/calendarApp')
                }

                if(data.transcript.toLowerCase().includes("profile")) {
                    console.log("profile");
                    router.push('profhist/profile')
                }

                if(data.transcript.toLowerCase().includes("symptom")) {
                    console.log("symptom");
                    router.push('SymptomScreen')
                }

                if(data.transcript.toLowerCase().includes("lifestyle") || data.transcript.toLowerCase().includes("education") ) {
                    console.log("education");
                    router.push('(tabs)/educational')
                }
                
                if(data.transcript.toLowerCase().includes("home")) {
                    console.log("home");
                    router.push('(tabs)')
                }
            }
        } catch (error) {
            console.error("❌ Upload error:", error);
            setTranscription("Error in transcription.");
        }
    };

    return (
        <SafeAreaView style={{padding:20}}>
            <Text style={styles.transcript}>{transcription}</Text>
        <View style={styles.container}>
             
           <TouchableOpacity  onPress={startRecording} style={styles.button}>
           <MaterialCommunityIcons name="record-circle-outline" size={24} color="white" />
           <Text style={{fontSize:24, color:'white'}}> Start  </Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={stopRecording} style={styles.button}>
           <MaterialCommunityIcons name="stop-circle-outline" size={24} color="white" />
           <Text style={{fontSize:24, color:'white'}}> Stop  </Text>
           </TouchableOpacity>          
        </View>
        {isRecording && (<Text style={styles.rectext}>Recording ...</Text>)}
        {/*<Text>Navigate to Calendar</Text>
        <Text>Navigate to Profile</Text>
        <Text>Navigate to Medical Dashboard</Text>
        <Text>Navigate to Tele Medicine</Text>*/}
        </SafeAreaView>
    );
}

const styles= StyleSheet.create({
button : {
    maxWidth:150, 
    alignSelf:'center', 
    backgroundColor:'#5b4d54', 
    borderRadius:15, 
    padding:10, 
    margin:10, 
    flexDirection:'row', 
    alignItems:'center',

}, 
container:{
    flexDirection:'row', 
    alignItems:'center',
    alignSelf:'center'
}, 
transcript:{
    fontSize:24,
    marginBottom:15,
    borderWidth:1, 
    padding:10,
    borderRadius:10
    
}, 
rectext:{
    fontSize:24, 
    alignSelf:'center', 
    marginTop:15
}
})
