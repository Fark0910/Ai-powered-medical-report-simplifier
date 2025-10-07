"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const gemai_1 = __importDefault(require("../controllers/gemai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post("/patient", async (req, res) => {
    try {
        const { tests } = req.body;
        if (!tests || !Array.isArray(tests)) {
            return res.status(400).json({ error: "Missing or invalid tests array" });
        }
        const prompt = `${process.env.prompt3} and here is the input"""${JSON.stringify(req.body)}"""`;
        try {
            await (0, gemai_1.default)(prompt).then(async (resp) => {
                console.log("PATIENT SUMMARY", resp.text);
                try {
                    const rep = await (0, gemai_1.default)(`${process.env.prompt4}${JSON.stringify(req.body)} and here is the input """ ${resp.text}"""`);
                    const take = JSON.parse(rep.text);
                    console.log("PATIENT FINAL REPORT", take);
                    return res.status(200).json(take);
                }
                catch (err) {
                    console.error("Error calling gem function:", err);
                }
            }).catch(err => console.error("Error in gem function:", err));
        }
        catch (err) {
            console.error("Error calling gem function:", err);
            return res.status(500).json({ error: "Error processing the request" });
        }
    }
    catch (error) {
        console.error("Error in /patient:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;
