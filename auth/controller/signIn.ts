import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const signIn = async (req : Request, res : Response) : Promise<void> => {

    try{
        const { email, password} = req.body;
    
        // check the req body
        if (!email || !password){
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password",
            });
            return;
        }
    
        const user = await User.findOne({email});
    
        if (user) {
            const isPasswordValid : boolean = await user.authenticate(password);
            if(isPasswordValid){
                const token = jwt.sign(
                    {_id : user._id, role: user.role }, // payload can be any object
                    process.env.JWT_SECRET as string,
                    {expiresIn : "2d"}
                );
    
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(StatusCodes.OK).json({
                    token,
                    user : {_id, firstName, lastName, email, role, fullName},
                });
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid Password",
                });
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                message : "User does not exist",
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
    }
    
}