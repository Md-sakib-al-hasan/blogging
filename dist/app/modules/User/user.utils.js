"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//create jwt token
const createToken = (jwtPayload, select, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, select, { expiresIn });
};
exports.createToken = createToken;
