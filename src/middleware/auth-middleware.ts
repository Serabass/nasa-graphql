import {Request, Response, NextFunction} from "express";
import {AuthTokenPayload} from "../resolvers/types/input-types";
import JWT from "../services/JWT";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return next();
    }
    const token = authorization.replace(/^Bearer\s+/, "");
    const verified = JWT.verify<AuthTokenPayload>(token);
    if (!verified) {
        return next();
    }
    // @ts-ignore
    req.userId = verified.id;

    return next();
};

export default authMiddleware;
