import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import morgan from "morgan";
//import flash from "connect-flash";
import userRoutes from "./routes/router";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(userRoutes);


app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:5002");
}); 
