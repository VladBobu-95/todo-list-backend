import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { env } from "../config/env";
import { UnauthorizedError } from "../utils/errors";


declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            sub: number;
            email: string;
        };
    }
}


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new UnauthorizedError("Token no proporcionado"));
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, env.jwt.secret, (err, decoded) => {
        if (err) {
            return next(new UnauthorizedError("Token inválido"));
        }
        req.user = decoded as unknown as { sub: number; email: string };
        next();
    });
}

