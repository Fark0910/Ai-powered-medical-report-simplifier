"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const gemai_1 = __importDefault(require("../controllers/gemai"));
const tessa_1 = __importDefault(require("../controllers/tessa"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const comm_1 = __importDefault(require("../helper/comm"));
const parser_1 = __importDefault(require("../controllers/parser"));
const remover_1 = __importDefault(require("../middlewares/remover"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post("/noocr", async (req, res) => {
    const { texti } = req.body;
    // console.log("Received text:", texti);
    try {
        const resp = await (0, gemai_1.default)(`${process.env.prompt1}and ${texti}`);
        if (!resp.text) {
            return res.status(500).send("No response from AI");
        }
        //console.log(typeof(resp.text));
        const parsedResponse = JSON.parse(resp.text);
        const newshow = await (0, comm_1.default)(parsedResponse);
        //console.log("parsed yaar",parsedResponse.tests_raw);
        console.log("INITIAL RESPONSE", parsedResponse);
        console.log("FINAL PATIENT REPORT:", newshow);
        return res.status(200).json(newshow);
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(500).send("Internal Server Error");
    }
});
router.post("/ocr", remover_1.default.single("medic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        const imagePath = req.file.path;
        const ocrText = await (0, tessa_1.default)(imagePath);
        if (!ocrText) {
            return res.status(500).send("OCR failed to extract text");
        }
        const aiResp = await (0, gemai_1.default)(`${process.env.prompt5} and ""${ocrText}""`);
        if (!aiResp.text) {
            return res.status(500).send("No response from AI");
        }
        const parsey = await (0, parser_1.default)(aiResp);
        const news = await (0, comm_1.default)(parsey);
        console.log("INITIAL RESPONSE", parsey);
        console.log("FINAL PATIENT REPORT:", news);
        fs_1.default.unlink(imagePath, (err) => {
            if (err)
                console.error("Cleanup failed:", err);
            else
                console.log("Temporary file removed:", imagePath);
        });
        return res.status(200).json(news);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error processing OCR");
    }
});
module.exports = router;
