import EnvValue from "./decorators/env";

export default class Env {

    @EnvValue.string()
    public static APP_SECRET: string;

    @EnvValue.number()
    public static PORT: number;

    @EnvValue.string()
    public static MONGODB_URI: string;
}
