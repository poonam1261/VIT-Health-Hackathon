const express = require("express");
const cors = require("cors");  // ✅ Import CORS
const multer = require("multer");
const speech = require("@google-cloud/speech");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors({
    origin:"http://localhost:8081", 
    methods: ["GET", "POST"],
    allowedHeaders:["Content-Type"]
}));  // ✅ Enable CORS for all routes

const upload = multer({ dest: "uploads/" });

const client = new speech.SpeechClient({
    keyFilename: "./GSTT_API_KEY/tactical-racer-440011-q3-140f1964c08f.json" 
});

app.post("/speech-to-text", upload.single("audio"), async (req, res) => {
    try {
        console.log("Received File:", req.file);  // ✅ Debugging

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const audioFile = fs.readFileSync(req.file.path);
        const audioBytes = audioFile.toString("base64");

        const request = {
            audio: { content: audioBytes },
            config: { 
                encoding: "WEBM_OPUS",  // this encoding is important 
                languageCode: "en-US",
               
            }
        };

        const [response] = await client.recognize(request);
        const transcription = response.results.map(result => result.alternatives[0].transcript).join("\n");

        res.json({ transcript: transcription });
    } catch (error) {
        console.error("🔥 ERROR:", error);  // ✅ Log the full error
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
