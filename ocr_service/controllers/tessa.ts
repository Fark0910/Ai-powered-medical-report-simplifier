import Tesseract from "tesseract.js";
const ocr=async(imagePath:string)=>{
    try{
        const result = await Tesseract.recognize(imagePath, "eng");
        const ocrText = result.data.text.trim();
        //console.log("OCR Text:", ocrText);
        return ocrText;


    }catch(err){
        console.error("Error during OCR processing:", err);
        throw err;
    }
    
}
export=ocr;
