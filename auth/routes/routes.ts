import express, { Router } from "express";
import {signIn, signUp} from "../controller/auth.controller";

// middlewares
import {  
    isRequestValidated,
    validateSignUpRequest,
    validateSignInRequest,
  } from "../middleware/validator";


const router : Router = express.Router();

// The .post() method accepts middleware and route handler functions as arguments

// signIn route, a HTTP POST endpoint is set up
router.route("/signin").post(validateSignInRequest, isRequestValidated, signIn);

// signUp route, a HTTP POST endpoint is set up
router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);


module.exports = router;