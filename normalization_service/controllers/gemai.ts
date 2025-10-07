import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: `${process.env.GEMINI_API_KEY}` });
const gem=async(texting:string)=>{ 
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${texting}`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, 
      }}
  });
    return response;
}

export =gem;