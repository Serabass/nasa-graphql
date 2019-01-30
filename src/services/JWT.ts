import * as jwt from "jsonwebtoken";
import Env from "../env";

export interface IJWTOptions {
    secret?: string;
    algorithm?: string;
}

export default class JWT {

    private static jwtTokenRegExp: RegExp = /^([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)(?:\.([A-Za-z0-9-_.+/=]*))?$/;

    public static DEFAULT_ALGO = "RS256";

    public static secret = Env.APP_SECRET;

    public static sign(payload: any, algorithm = this.DEFAULT_ALGO, secret = this.secret): string {
        return jwt.sign(payload, secret, { algorithm });
    }

    public static verify<T = any>(token: string, algorithm = this.DEFAULT_ALGO, secret = this.secret): T {
        return jwt.verify(token, secret, { algorithms: [algorithm] }) as unknown as T;
    }

    /**
     * Проверяем, является ли токен JWT
     *
     * @param {*} token
     */
    public static isJWT(token: string): boolean {
        return this.jwtTokenRegExp.test(token);
    }
}
