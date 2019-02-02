import If from "./if";
import Env from "../env";
import {FieldResolver} from "type-graphql";
import {AdvancedOptions, ReturnTypeFunc} from "type-graphql/decorators/types";

export default class Corp {
    public static FieldResolver(options?: AdvancedOptions);
    public static FieldResolver(returnTypeFunction?: ReturnTypeFunc, options?: AdvancedOptions);
    public static FieldResolver(...args) {
        return If(() => Env.CORP, FieldResolver(...args));
    }
}
