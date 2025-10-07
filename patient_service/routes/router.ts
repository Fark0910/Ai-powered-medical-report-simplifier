import { Router, Request, Response, response } from "express";

import gem from "../controllers/gemai";
import dotenv from "dotenv";
import parsing from "../controllers/parser"
import path from "path";
import fs from "fs";
//import parsing from "../controllers/parser";
import { json } from "body-parser";

dotenv.config();
const router = Router();

interface Tex {
  test?: string;
  
}
router.post("/patient", async (req, res) => {

  try {
    const { tests} = req.body;

    if (!tests|| !Array.isArray(tests)) {
      return res.status(400).json({ error: "Missing or invalid tests array" });
    }

  
    const prompt:string= `${process.env.prompt3} and here is the input"""${JSON.stringify(req.body)}"""`;
    try {
      await gem(prompt).then(async(resp)=>
       {console.log("PATIENT SUMMARY", resp.text)
        try{
          const rep:any=await gem(`${process.env.prompt4}${JSON.stringify(req.body)} and here is the input """ ${resp.text}"""`);
          const take=JSON.parse(rep.text)
          console.log("PATIENT FINAL REPORT", take)
          return res.status(200).json(take);
        }
        catch(err){ 
          console.error("Error calling gem function:", err);
        
       } }
      ).catch(err=>
        console.error("Error in gem function:", err)
      );
      
    
    }catch(err){
      console.error("Error calling gem function:", err);
      return res.status(500).json({ error: "Error processing the request" });
    }
    
  } catch (error) {
    console.error("Error in /patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
   }
  )

/*fake frontend
router.get("/login", (req: Request, res: Response) => {
  res.render("index");
});*/

export = router;