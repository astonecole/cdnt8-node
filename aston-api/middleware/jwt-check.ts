import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import * as httpContext from 'express-http-context';
import { getRepository } from "typeorm";
import { User } from "../src/entity/User";

export const JWT_SIGN_KEY = 'JD7DF@df8SD#BSD!jNX927#Pmsf893N$$c&Cudksnsz7639SSLD02#SDK(;';

export async function jwtCheck(request: Request, response: Response, next: NextFunction) {
    const auth = request.header('Authorization');

    if (!auth) {
        response.status(401);
        return { error: 'Unauthorized', code: 401 };
    }

    const token = auth.substr('Bearer '.length);
    const decoded: any = verify(token, JWT_SIGN_KEY);

    if (!decoded) {
        response.status(401);
        return { error: 'Unauthorized', code: 401 };
    }

    const repo = getRepository(User);

    try {
        const user = await repo.findOne(decoded.id);
        httpContext.set('user', user);
        next();
    } catch (error) {
        response.status(500).json(error);
    }
}
