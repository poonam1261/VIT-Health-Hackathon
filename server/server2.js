const express = require("express");
const cors = require("cors");
const multer = require("multer");
const speech = require("@google-cloud/speech");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// ✅ Enable CORS for all clients (Web, Android, iOS)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ Configure Multer for File Uploads
const upload = multer({ dest: "uploads/" });

const client = new speech.SpeechClient({
    keyFilename: "./GSTT_API_KEY/tactical-racer-440011-q3-140f1964c08f.json"
});

// ✅ Route to Handle Audio Upload & Transcription
app.post("/speech-to-text", upload.single("audio"), async (req, res) => {
    try {
        console.log("📁 Received File:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // ✅ Read File & Convert to Base64
        const filePath = path.join(__dirname, req.file.path);
        const audioFile = fs.readFileSync(filePath);
        const audioBytes = audioFile.toString("base64");

        // ✅ Request for Google Speech-to-Text API
        const request = {
            audio: { content: audioBytes },
            config: { 
                encoding: "LINEAR16",  // ✅ Change to "WEBM_OPUS" or "AMR" if needed
                languageCode: "en-US",
                enableAutomaticPunctuation: true
            }
        };

        // ✅ Send Request to Google Cloud
        const [response] = await client.recognize(request);
        const transcription = response.results.map(result => result.alternatives[0].transcript).join("\n");

        console.log("📝 Transcription:", transcription);

        // ✅ Send Response
        res.json({ transcript: transcription });

        // ✅ Clean Up Uploaded File (Optional)
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error("🔥 ERROR:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// ✅ Start Server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
