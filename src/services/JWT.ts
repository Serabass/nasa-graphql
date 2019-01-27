import * as jwt from "jsonwebtoken";

export default class JWT {

    public static secret = process.env.APP_SECRET;

    public static sign(payload: any, secret: string = this.secret): string {
        return jwt.sign(payload, secret);
    }

    public static verify<T>(token: string, secret: string = this.secret): T {
        return <any>jwt.verify(token, secret);
    }
}
