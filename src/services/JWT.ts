import * as jwt from "jsonwebtoken";

export default class JWT {

    public static DEFAULT_ALGO = 'RS256'; 

    public static secret = process.env.APP_SECRET;

    public static sign(payload: any, secret: string = this.secret): string {
        return jwt.sign(payload, secret, {
            algorithm: this.DEFAULT_ALGO
        });
    }

    public static verify<T>(token: string, secret: string = this.secret): T {
        return <T><unknown>jwt.verify(token, secret, {
            algorithms: [this.DEFAULT_ALGO]
        });
    }
}
