"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt_secret = void 0;
require("dotenv/config");
exports.jwt_secret = process.env.JWT_SECRET;
