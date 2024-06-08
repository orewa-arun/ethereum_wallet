"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
const http_status_codes_1 = require("http-status-codes");
const authenticateToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log("token : ", token);
    if (!token) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: "invalid token" });
        return;
    }
    jsonwebtoken_1.default.verify(token, auth_config_1.jwt_secret, (err, decodedToken) => {
        if (err) {
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message: err });
            return;
        }
        // console.log("token verified!, user is : ", decodedToken);
        req.user = decodedToken; // store the decoded token in the req object
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "authorised!" });
        next();
    });
};
exports.authenticateToken = authenticateToken;
