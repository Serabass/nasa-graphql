import EnvValue from "./decorators/env";

export default class Env {

    @EnvValue.string()
    public static APP_SECRET;

    @EnvValue.string()
    public static MONGODB_URI;
}
