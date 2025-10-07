import multer from "multer";
import path from "path";
import { Request } from "express";
const storage = multer.diskStorage({
  destination: (req:Request, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req:Request, file, cb) => {
    const ext = path.extname(file.originalname); 
    const name = path.basename(file.originalname, ext); 
    const uniqueName = `${name}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const up = multer({ storage });
export=up;