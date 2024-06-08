"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequestValidated = exports.validateSignInRequest = exports.validateSignUpRequest = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
// Validation middleware for sign-up requests
exports.validateSignUpRequest = [
    (0, express_validator_1.check)("firstName").notEmpty().withMessage("First Name is required"),
    (0, express_validator_1.check)("lastName").notEmpty().withMessage("Last Name is required"),
    (0, express_validator_1.check)("email").isEmail().withMessage("Valid Email required"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
];
// Validation middleware for sign-in requests
exports.validateSignInRequest = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Valid Email required"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
];
// Middleware to check if the request is validated
const isRequestValidated = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: errors.array()[0].msg });
        return;
    }
    next();
};
exports.isRequestValidated = isRequestValidated;
