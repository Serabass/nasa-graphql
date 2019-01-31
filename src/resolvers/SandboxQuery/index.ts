import {Ctx, FieldResolver, Info, ObjectType, Resolver, Root} from "type-graphql";
import {Context} from "../../context";
import {GraphQLInt} from "graphql";

@ObjectType()
@Resolver(() => SandboxQuery)
export class SandboxQuery {
    constructor() {
    }

    @FieldResolver((type) => GraphQLInt, {nullable: true})
    public async num(@Ctx() ctx: Context, @Info() info: any): Promise<number> {
        debugger;
        info;
        return 666;
    }

}
