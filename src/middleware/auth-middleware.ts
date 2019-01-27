import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import {AuthTokenPayload} from '../resolvers/models/types';
import JWT from "../services/JWT";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return next();
    }
    const token = authorization.replace('Bearer ', '');
    const verified = JWT.verify<AuthTokenPayload>(token);
    if (!verified) {
        return next();
    }
    req['userId'] = verified.id;

    return next();
};

export default authMiddleware;
