import React, { useState, useRef } from "react";
import { View, Button, Text, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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

                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.current.push(event.data);
                };

                mediaRecorder.start();
                console.log("🎙️ Web Recording started...");
            } catch (error) {
                console.error("❌ Web Recording failed:", error);
            }
        } else {
            try {
                await Audio.requestPermissionsAsync();
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );
                setRecording(recording);
                console.log("🎙️ Native Recording started...");
            } catch (error) {
                console.error("❌ Native Recording failed:", error);
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

                if(data.transcript.toLowerCase().includes("dashboard")) {
                    console.log("Meddash");
                    router.push('(tabs)/meddash')
                }

                if(data.transcript.toLowerCase().includes("calendar")) {
                    console.log("calendar");
                    router.push('calendar/calendarApp')
                }

                if(data.transcript.toLowerCase().includes("profile")) {
                    console.log("calendar");
                    router.push('profhist/profile')
                }

                if(data.transcript.toLowerCase().includes("symptom")) {
                    console.log("calendar");
                    router.push('SymptomScreen')
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
           <Text style={{fontSize:24, color:'white'}}>🎤 Start  </Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={stopRecording} style={styles.button}>
           <Text style={{fontSize:24, color:'white'}}>🛑 Stop  </Text>
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
    backgroundColor:'#829582', 
    borderRadius:15, 
    padding:10, 
    margin:10
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
