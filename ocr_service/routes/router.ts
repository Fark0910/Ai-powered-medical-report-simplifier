import { Router, Request, Response } from "express";
import { nanoid } from "nanoid";
import gem from "../controllers/gemai";
import ocr from "../controllers/tessa";
import dotenv from "dotenv";
import fs from "fs";
import calle from "../helper/comm";
import parsing from "../controllers/parser";
import up  from "../middlewares/remover";

dotenv.config();
const router = Router();

interface Tex {
  texti?: string;
  file?: Express.Multer.File;

}
router.post("/noocr", async (req: Request<Tex>, res: Response) => {
  const { texti } = req.body;
 // console.log("Received text:", texti);
  try {
    const resp = await gem(`${process.env.prompt1}and ${texti}`);
    
    if (!resp.text) {
      return res.status(500).send("No response from AI");
    }
    //console.log(typeof(resp.text));
    const parsedResponse = JSON.parse(resp.text)

    const newshow=await calle(parsedResponse)
    //console.log("parsed yaar",parsedResponse.tests_raw);
    console.log("INITIAL RESPONSE",parsedResponse);
    console.log("FINAL PATIENT REPORT:",newshow); 
    return res.status(200).json(newshow);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/ocr",up.single("medic"),async (req: Request<Tex>, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    
    const imagePath = req.file.path;
    const ocrText=await ocr(imagePath);
    if (!ocrText) {
      return res.status(500).send("OCR failed to extract text");
    }
   
    const aiResp = await gem(`${process.env.prompt5} and ""${ocrText}""`);

    if (!aiResp.text) {
      return res.status(500).send("No response from AI");
    }   
    const parsey=await parsing(aiResp)
    const news=await calle(parsey)
    console.log("INITIAL RESPONSE",parsey);
    console.log("FINAL PATIENT REPORT:",news); 
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Cleanup failed:", err);
      else console.log("Temporary file removed:", imagePath);
    });


    return res.status(200).json(news);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing OCR");
  }
});                   

/*fake frontend
router.get("/login", (req: Request, res: Response) => {
  res.render("index");
});*/

export = router;