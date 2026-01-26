
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getGiftRecommendations(preferences: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is looking for a luxury gift with these preferences: "${preferences}". 
      Recommend 3 types of luxury home gifts (like 'Artisan Ceramics', 'Crystal Stemware', or 'Egyptian Cotton Linens') 
      and a brief reason why for each. Format the output as a friendly expert concierge.`,
      config: {
        systemInstruction: "You are the head concierge at Elevated Living, a high-end home decor boutique. You are elegant, sophisticated, and helpful.",
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our concierge is currently busy, but we recommend our Signature Gold Rim glasses for a timeless choice.";
  }
}
