import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { errorsUnauthorized } from "./error";

export const checkSession = (req: Request, res: Response, next: NextFunction) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        verify(token, `${process.env.SECRET}`, (error: any, decoded: any) => {
            if (error) {
                res.status(401).json({
                    success: false,
                    message: errorsUnauthorized.token
                })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message: errorsUnauthorized.signin
        })
    }
}
