
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function generatePoster() {
  const prompt = "A professional, cinematic, high-quality political campaign poster for a movement in Martinique called 'UTILES'. The main color is deep blue (#0E5A7A). The image should feature a diverse group of Martinican people (men, women, young, old) looking forward with hope, standing in a modern town square with tropical greenery. In the background, a blurred view of a town hall and the sea. The lighting is warm and golden hour. There are blue flags or banners with the 'UTILES' logo (implied). The atmosphere is serious, determined, and community-focused. No text overlay. 4k resolution, photorealistic.";
  const dir = path.resolve('public/assets/campaign');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    console.log("Generating poster with gemini-3.1-flash-image-preview...");
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          const filePath = path.join(dir, 'video-poster.jpg');
          fs.writeFileSync(filePath, buffer);
          console.log(`Poster saved to ${filePath}`);
          return;
        }
      }
    }
    console.error("No image found in response");
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generatePoster();
