"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
// middlewares
const auth_validator_1 = require("../middleware/auth.validator");
const token_verify_1 = require("../middleware/token.verify");
const router = express_1.default.Router();
// The .post() method accepts middleware and route handler functions as arguments
// signIn route, a HTTP POST endpoint is set up
router.route("/signin").post(auth_validator_1.validateSignInRequest, auth_validator_1.isRequestValidated, auth_controller_1.signIn);
// signUp route, a HTTP POST endpoint is set up
router.route("/signup").post(auth_validator_1.validateSignUpRequest, auth_validator_1.isRequestValidated, auth_controller_1.signUp);
// authenticate test route, a HTTP GET endpoint is set up
router.route("/protected").get(token_verify_1.authenticateToken);
exports.default = router;
