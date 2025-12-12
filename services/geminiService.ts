import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export interface AiInsight {
  text: string;
  sources?: Array<{ title: string; uri: string }>;
}

export const askAiAboutDeal = async (
  question: string, 
  productContext: any, 
  location?: { lat: number; lng: number }
): Promise<AiInsight> => {
  try {
    const model = 'gemini-2.5-flash';
    let config: any = {};

    if (location) {
       config.tools = [{ googleMaps: {} }];
       config.toolConfig = {
         retrievalConfig: {
           latLng: {
             latitude: location.lat,
             longitude: location.lng
           }
         }
       };
    }

    const prompt = `
      You are a helpful shopping assistant for "FlashDeals".
      Context about the current product:
      Name: ${productContext.name}
      Original Price: $${productContext.originalPrice}
      Sale Price: $${productContext.salePrice}
      Features: ${productContext.features.join(', ')}

      User Question: ${question}
      ${location ? "The user is located at the provided coordinates. If they ask about local availability, comparisons, or stores, use Google Maps to find relevant places nearby. Provide a local perspective." : ""}

      Answer briefly (under 60 words) and enthusiastically. 
      If you find specific stores via Google Maps, mention them by name.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config
    });

    const sources: Array<{ title: string; uri: string }> = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({ title: chunk.web.title, uri: chunk.web.uri });
        } else if (chunk.maps) {
           // Extracts map URI and Title
           sources.push({ 
             title: chunk.maps.title, 
             uri: chunk.maps.googleMapsUri || chunk.maps.uri 
           });
        }
      });
    }

    return {
       text: response.text || "I'm having trouble analyzing this deal right now, but at 50% off, it looks great!",
       sources: sources.length > 0 ? sources : undefined
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "This deal is selling fast! I'd recommend grabbing it while you can." };
  }
};

export const generateRewardImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};