import { GoogleGenAI, Type, Schema, FunctionDeclaration } from "@google/genai";
import { ImageSize } from "../types";

// Helper to get the AI client. 
// Note: For Image Gen (Veo/Pro Image), we recreate the client to ensure we have the selected key.
const getClient = (apiKey?: string) => {
    const key = apiKey || process.env.API_KEY;
    if (!key) {
        console.error("API_KEY not found in environment");
    }
    return new GoogleGenAI({ apiKey: key });
};

// 1. Summarization Service (Uses Flash for speed/cost)
export const summarizeArticle = async (text: string): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `Summarize the following article in a concise, logical manner (max 3-4 sentences):\n\n${text}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful historian assistant.",
      }
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Summarization failed", error);
    return "Error generating summary. Please try again.";
  }
};

// 2. Chatbot Service (Uses Pro Preview as requested)
export const chatWithBot = async (history: {role: 'user'|'model', text: string}[], newMessage: string) => {
    try {
        const ai = getClient();
        const chat = ai.chats.create({
            model: 'gemini-3-pro-preview',
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            })),
            config: {
                systemInstruction: "You are an expert historian specializing in the 1960s through the 2020s. Provide detailed, accurate answers.",
            }
        });

        const response = await chat.sendMessage({ message: newMessage });
        return response.text || "I'm not sure how to answer that.";
    } catch (error) {
        console.error("Chat failed", error);
        return "Sorry, I encountered an error connecting to the history archives.";
    }
}

// 3. Search Grounding Service (Uses Flash + Tools as requested)
export const searchWeb = async (query: string) => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                tools: [{ googleSearch: {} }],
            }
        });

        const text = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        // Extract links from grounding chunks
        const links: {title: string, url: string}[] = [];
        groundingChunks.forEach((chunk: any) => {
            if (chunk.web) {
                links.push({
                    title: chunk.web.title || "Source",
                    url: chunk.web.uri
                });
            }
        });

        return { text, links };
    } catch (error) {
        console.error("Search failed", error);
        throw error;
    }
}

// 4. Image Generation (Uses gemini-3-pro-image-preview)
// Requires API Key Selection
export const generateHistoricalImage = async (prompt: string, size: ImageSize) => {
    // Check for API key selection
    // @ts-ignore
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
             // @ts-ignore
            await window.aistudio.openSelectKey();
        }
    }

    // Re-initialize client to pick up the potentially newly selected key
    const ai = getClient(); 
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    imageSize: size, // 1K, 2K, 4K
                    aspectRatio: "16:9" 
                }
            }
        });

        // Parse response for image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        throw new Error("No image data found in response");

    } catch (error) {
        console.error("Image generation failed", error);
        throw error;
    }
}

// 5. Translation Service
export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
    try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate the following text into ${targetLanguage}. Return only the translated text.\n\n${text}`,
        });
        return response.text || "Translation failed.";
    } catch (error) {
        console.error("Translation failed", error);
        return "Error performing translation.";
    }
};
