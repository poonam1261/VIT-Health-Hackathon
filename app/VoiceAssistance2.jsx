import React, { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";

export default function VoiceAssistance() {
    const [recording, setRecording] = useState(null);
    const [transcription, setTranscription] = useState("");

    const startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access microphone was denied.");
                return;
            }
    
            const recordingObject = new Audio.Recording();
            await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recordingObject.startAsync();
            setRecording(recordingObject);
            console.log("🎙️ Recording started...");
        } catch (err) {
            console.error("Failed to start recording", err);
        }
    };
    

    const stopRecording = async () => {
        if (!recording) return;

        console.log("⏹️ Stopping recording...");
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);

        console.log("📁 Recorded file saved at:", uri);
        if (uri) {
            sendAudioToServer(uri);
        }
    };

    const sendAudioToServer = async (uri) => {
        try {
            console.log("📤 Preparing file for upload...");
    
            const fileInfo = await FileSystem.getInfoAsync(uri);
            console.log("📁 File Info:", fileInfo);
    
            if (!fileInfo.exists) {
                console.error("❌ File does not exist:", uri);
                return;
            }
    
            // ✅ Ensure file is accessible
            const newUri = FileSystem.documentDirectory + "recording.wav";
            await FileSystem.copyAsync({ from: uri, to: newUri });
            console.log("✅ File moved to:", newUri);
    
            // ✅ Construct FormData Correctly
            const formData = new FormData();
            formData.append("audio", {
                uri: newUri,
                type: "audio/wav",
                name: "recording.wav",
            });
    
            console.log("📤 Uploading file...");
    
            const response = await fetch("http://192.168.104.36:3000/speech-to-text", {
                method: "POST",
                body: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            console.log("🔄 Server Response Status:", response.status);
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText}`);
            }
    
            const data = await response.json();
            console.log("📝 Transcription:", data);
            setTranscription(data.transcript);
        } catch (error) {
            console.error("❌ Error uploading file:", error);
        }
    };
    
    return (
        <View>
            <Button title="Start Recording" onPress={startRecording} disabled={recording !== null} />
            <Button title="Stop Recording" onPress={stopRecording} disabled={recording === null} />
            <Text>{transcription}</Text>
        </View>
    );
}
