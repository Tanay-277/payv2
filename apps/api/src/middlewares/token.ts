import { NextFunction, Request, Response } from "express";
import { STATUS } from "../types";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies['next-auth.session-token'];
        if (!token) {
            return res.status(STATUS.UNAUTHORIZED).json({ msg: "Unauthorized Access" });
        }
        // console.log("token", token);
        next();
    } catch (err: any) {
        console.error("Error decoding token", err);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error", err });
    }
}