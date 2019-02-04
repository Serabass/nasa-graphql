import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {ApiQuery} from "./ApiQuery";
import {PassNext} from "../../../../decorators/pass-next";

@ArgsType()
class NEOUrlArgs {
    @Field({nullable: true}) public version: string = "v1";
}

@ObjectType()
@Resolver(() => EPICQuery)
export class EPICQuery {
    @PassNext({
        type: ApiQuery,
        path: "/api",
    })
    public api: () => Promise<ApiQuery>;

}
