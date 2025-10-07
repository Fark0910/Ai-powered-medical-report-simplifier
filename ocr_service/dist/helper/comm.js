"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const calle = async (parsedResponse) => {
    const show = await axios_1.default.post("http://normalize-service:5001/normalize", parsedResponse, { headers: { "Content-Type": "application/json" } });
    return show.data;
};
module.exports = calle;
