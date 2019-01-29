import EnvValue from "./decorators/env";

export default class Env {

    @EnvValue()
    public static APP_SECRET;
}
