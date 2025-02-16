import React, { useState, useRef } from "react";
import { View, Button, Text, Platform } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function VoiceAssistance() {
    const [recording, setRecording] = useState(null);
    const [transcription, setTranscription] = useState("Tap 'Start' to record");
    const mediaRecorderRef = useRef(null);
    const audioChunks = useRef([]);
    const navigation = useNavigation();
    const router = useRouter();

    // 🎤 Start Recording (Handles Web & Native)
    const startRecording = async () => {
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
            }
        } catch (error) {
            console.error("❌ Upload error:", error);
            setTranscription("Error in transcription.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Button title="🎤 Start Recording" onPress={startRecording} />
            <Button title="🛑 Stop Recording" onPress={stopRecording} />
            <Text style={{ marginTop: 20, fontSize: 18 }}>{transcription}</Text>
        </View>
    );
}
