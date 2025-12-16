import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
  genAI = new GoogleGenAI({ apiKey });
};

export const translateTextChunk = async (
  text: string,
  sourceLang: string = 'Vietnamese',
  targetLang: string = 'Japanese'
): Promise<string> => {
  if (!genAI) {
    throw new Error("Gemini API not initialized");
  }

  // Use Flash model for speed and efficiency in translation tasks
  const modelId = 'gemini-2.5-flash';

  const prompt = `
    You are a professional translator engine. 
    Translate the following text from ${sourceLang} to ${targetLang}.
    
    IMPORTANT RULES:
    1. Preserve all original formatting, special characters, and code-like structures strictly.
    2. Do not explain the translation. Return ONLY the translated text.
    3. If the text appears to be a formula or code (e.g., starts with =, contains variable names), keep it intact or only translate string literals inside it.
    4. For CSV or structured data, maintain the delimiters exactly.

    Text to translate:
    """
    ${text}
    """
  `;

  try {
    const response = await genAI.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    
    return response.text || text; // Fallback to original if empty
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};