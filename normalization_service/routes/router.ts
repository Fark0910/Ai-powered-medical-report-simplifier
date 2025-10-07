import { Router, Request, Response } from "express";
import parsing from "../controllers/parser"
import gem from "../controllers/gemai";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import axios from "axios";
import calle from "../helper/comm"
//import parsing from "../controllers/parser";

dotenv.config();
const router = Router();

interface Tex {
  text_raw?: Array<string>;
  confidence?:Number;
}
router.post("/normalize", async (req:Request<Tex>, res:Response) => {

  try {
    const { tests_raw, confidence } = req.body;
    if (!tests_raw || !Array.isArray(tests_raw)) {
      return res.status(400).json({ error: "Missing or invalid tests_raw array" });
    }
    const prompt = `${process.env.prompt2}${req.body}`;

    try {
      const resp= await gem(prompt)
      const parsedResponse=await parsing(resp)
      const final=await calle(parsedResponse)
      console.log("NORMALIZED RESPONSE:",parsedResponse);
      return res.status(200).json(final);
    }catch(err){
      console.error("Error calling gem function:", err);
      return res.status(500).json({ error: "Error processing the request" });
    }
  } catch (error) {
    console.error("Error in /normalize:", error);
    res.status(500).json({ error: "Internal server error" });
  }
   }
  )

/*fake frontend
router.get("/login", (req: Request, res: Response) => {
  res.render("index");
});*/

export = router;