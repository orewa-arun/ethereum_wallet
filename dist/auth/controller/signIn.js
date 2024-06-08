"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // check the req body
        if (!email || !password) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
            return;
        }
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            const isPasswordValid = yield user.authenticate(password);
            if (isPasswordValid) {
                const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, // payload can be any object
                auth_config_1.jwt_secret, { expiresIn: "2d" });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                });
            }
            else {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid Password",
                });
            }
        }
        else {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "User does not exist",
            });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.signIn = signIn;
