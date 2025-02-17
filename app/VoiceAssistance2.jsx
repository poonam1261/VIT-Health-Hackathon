import React, { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";

export default function VoiceAssistance() {
    const [recording, setRecording] = useState(null);
    const [transcription, setTranscription] = useState("");

    const startRecording = async () => {
        try {
            // Request permission for microphone
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== "granted") {
                console.error("Permission to access microphone was denied.");
                return;
            }

            // Prepare recording
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
            // Ensure file exists
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (!fileInfo.exists) {
                console.error("❌ File does not exist:", uri);
                return;
            }

            // Move file for access
            const newUri = FileSystem.documentDirectory + "recording.wav";
            await FileSystem.moveAsync({ from: uri, to: newUri });

            // Create formData
            const formData = new FormData();
            formData.append("audio", {
                uri: newUri,
                type: "audio/wav",
                name: "recording.wav",
            });

            console.log("📤 Uploading file...");

            const response = await fetch("http://your-server-ip:3000/speech-to-text", {
                method: "POST",
                body: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

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
