import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not set.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function generateVideo() {
  console.log("Starting video generation...");
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: "A cinematic, high-quality video of a political campaign in Martinique. Showing diverse people interacting in a sunny, tropical town square. Blue and green colors. Professional, dynamic, and authentic atmosphere. 4k resolution.",
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });

    console.log("Video generation started. Polling for completion...");
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({operation: operation});
      console.log("Still processing...");
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
      console.error("No video URI returned.");
      return;
    }

    console.log(`Video generated at: ${videoUri}`);
    console.log("Downloading video...");

    const response = await fetch(videoUri, {
      headers: {
        'x-goog-api-key': apiKey
      }
    });

    if (!response.ok) {
      console.error(`Failed to download video: ${response.statusText}`);
      return;
    }

    const buffer = await response.arrayBuffer();
    const outputPath = path.join(process.cwd(), 'public', 'assets', 'campaign', 'video-campagne.mp4');
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`Video saved to ${outputPath}`);

  } catch (error) {
    console.error("Error generating video:", error);
    process.exit(1);
  }
}

generateVideo();
