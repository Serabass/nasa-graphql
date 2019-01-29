import {Column, ColumnOptions} from "typeorm";
import {Ctx} from "type-graphql";

export function RelationColumn(options?: ColumnOptions) {
    return Column({nullable: true, ...options});
}

export function CtxUser(target: any, propertyKey: string | symbol, parameterIndex: number) {
    return Ctx("user")(target, propertyKey, parameterIndex);
}
