"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const parser_1 = __importDefault(require("../controllers/parser"));
const gemai_1 = __importDefault(require("../controllers/gemai"));
const dotenv_1 = __importDefault(require("dotenv"));
const comm_1 = __importDefault(require("../helper/comm"));
//import parsing from "../controllers/parser";
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post("/normalize", async (req, res) => {
    try {
        const { tests_raw, confidence } = req.body;
        if (!tests_raw || !Array.isArray(tests_raw)) {
            return res.status(400).json({ error: "Missing or invalid tests_raw array" });
        }
        const prompt = `${process.env.prompt2}${req.body}`;
        try {
            const resp = await (0, gemai_1.default)(prompt);
            const parsedResponse = await (0, parser_1.default)(resp);
            const final = await (0, comm_1.default)(parsedResponse);
            console.log("NORMALIZED RESPONSE:", parsedResponse);
            return res.status(200).json(final);
        }
        catch (err) {
            console.error("Error calling gem function:", err);
            return res.status(500).json({ error: "Error processing the request" });
        }
    }
    catch (error) {
        console.error("Error in /normalize:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;
