import EnvValue from "./decorators/env";

export default class Env {

    @EnvValue.string()
    public static APP_SECRET: string;

    @EnvValue.number()
    public static PORT: number;

    @EnvValue.string()
    public static MONGODB_URI: string;

    @EnvValue.boolean()
    public static CORP: boolean;

    @EnvValue.boolean()
    public static SHOW_HIDDEN_RESOLVERS: boolean;
}
