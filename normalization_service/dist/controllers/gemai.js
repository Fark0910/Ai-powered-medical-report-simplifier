"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const genai_1 = require("@google/genai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ai = new genai_1.GoogleGenAI({ apiKey: `${process.env.GEMINI_API_KEY}` });
const gem = async (texting) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${texting}`,
        config: {
            thinkingConfig: {
                thinkingBudget: 0,
            }
        }
    });
    return response;
};
module.exports = gem;
