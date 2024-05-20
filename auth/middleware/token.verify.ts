import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwt_secret } from '../config/auth.config';
import { StatusCodes } from 'http-status-codes';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token : string = req.headers['x-access-token'] as string;

    console.log("token : ", token);
    
    if (!token) {
        res.status(StatusCodes.BAD_REQUEST).json({ message : "invalid token"});
        return ;
    }

    jwt.verify(token, jwt_secret as string, (err, decodedToken) => {
        if (err) {
            res.status(StatusCodes.FORBIDDEN).json({ message : err});
            return;
        }
        // console.log("token verified!, user is : ", decodedToken);
        req.user = decodedToken as JwtPayload; // store the decoded token in the req object
        next();
    });
};
