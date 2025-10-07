"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const calle = async (parsedResponse) => {
    const show = await axios_1.default.post("http://patient-service:5002/patient", parsedResponse, { headers: { "Content-Type": "application/json" } });
    return show.data;
};
module.exports = calle;
