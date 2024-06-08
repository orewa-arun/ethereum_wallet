import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const signUp = async (req : Request, res : Response) : Promise<void>  => {

    const {firstName, lastName, email, password} = req.body;

    // check req body
    if(!firstName || !lastName || !email || !password){
        res.status(StatusCodes.BAD_REQUEST).json({
            message : "please provide requested Information",
        });
        return;
    }

    const hash_password = await bcrypt.hash(password, 10);

    const userData = {
        firstName,
        lastName,
        email,
        hash_password,
    }

    try{
        const user = await User.findOne({email});
        if (user) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message : "User already registered",
            });
        } else {
            await User.create(userData);
            res.status(StatusCodes.CREATED).json({
                message : "User created Successfully!"
            }); 
        }
    }catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
    }
}