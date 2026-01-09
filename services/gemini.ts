
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// Shared client initialization
const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is not configured.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateText = async (prompt: string, history: {role: string, content: string}[] = []) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are an expert AI assistant on DUYIT.NET. Provide concise, high-quality, and helpful answers.',
    }
  });

  // Simple prompt wrapper for chat
  const response: GenerateContentResponse = await chat.sendMessage({ message: prompt });
  return response.text;
};

export const generateImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1") => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: { aspectRatio }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateSpeech = async (text: string, voice: string = 'Kore') => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });

  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};
