import JWT from "../../src/services/JWT";

describe("JWT Tests", () => {
    it("isJWT() test", () => {
        let token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9." +
            "eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIEdvbGQiLCJhZG1pbiI6dHJ1ZX0." +
            "LIHjWCBORSWMEibq-tnT8ue_deUqZx1K0XxCOXZRrBI";
        expect(JWT.isJWT(token)).toBeTruthy();
        expect(JWT.isJWT("")).toBeFalsy();
    });

    xit("sign() test", () => {
        let payload = {
            a: 1,
        };
        let key = "123";
        let jwt = JWT.sign(payload, {algorithm: "RS256", secret: key});
        expect(JWT.isJWT(jwt)).toBeTruthy();
        expect(JWT.verify(jwt, {algorithm: "RS256", secret: key})).toBeDefined();
    });
});
