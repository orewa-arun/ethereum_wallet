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
exports.signUp = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    // check req body
    if (!firstName || !lastName || !email || !password) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            message: "please provide requested Information",
        });
        return;
    }
    const hash_password = yield bcryptjs_1.default.hash(password, 10);
    const userData = {
        firstName,
        lastName,
        email,
        hash_password,
    };
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "User already registered",
            });
        }
        else {
            yield user_model_1.default.create(userData);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: "User created Successfully!"
            });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
});
exports.signUp = signUp;
