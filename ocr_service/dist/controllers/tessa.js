"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const ocr = async (imagePath) => {
    try {
        const result = await tesseract_js_1.default.recognize(imagePath, "eng");
        const ocrText = result.data.text.trim();
        //console.log("OCR Text:", ocrText);
        return ocrText;
    }
    catch (err) {
        console.error("Error during OCR processing:", err);
        throw err;
    }
};
module.exports = ocr;
