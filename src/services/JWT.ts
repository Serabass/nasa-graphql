import * as jwt from "jsonwebtoken";
import Env from "../env";

export default class JWT {

    private static jwtTokenRegExp: RegExp = /^([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)(?:\.([A-Za-z0-9-_.+/=]*))?$/;

    public static DEFAULT_ALGO = "RS256";

    public static secret = Env.APP_SECRET;

    public static sign<T = any>(payload: T, {algorithm = this.DEFAULT_ALGO, secret = this.secret}): string {
        // TODO use public and private keys
        return jwt.sign(payload as any, secret, { algorithm });
    }

    public static verify<T = any>(token: string, {algorithm = this.DEFAULT_ALGO, secret = this.secret}): T {
        // TODO use public and private keys
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
