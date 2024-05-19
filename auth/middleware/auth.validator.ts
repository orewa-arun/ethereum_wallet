import { Request, Response, NextFunction } from "express";
import {check , validationResult} from "express-validator";
import { StatusCodes } from "http-status-codes";

// Validation middleware for sign-up requests
export const validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  check("email").isEmail().withMessage("Valid Email required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

// Validation middleware for sign-in requests
export const validateSignInRequest = [
  check("email").isEmail().withMessage("Valid Email required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

// Middleware to check if the request is validated
export const isRequestValidated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: errors.array()[0].msg });
    return;
  }
  next();
};
