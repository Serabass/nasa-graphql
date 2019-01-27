import {Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {ProductMutation} from "./ProductMutation";
import {Context} from "../../context";

@ObjectType()
@Resolver(() => PaperfoxMutation)
export class PaperfoxMutation {
    constructor() {
    }

    @FieldResolver(type => ProductMutation)
    async Product(@Ctx() ctx: Context,
                   @Root() pf: PaperfoxMutation): Promise<any> {
        return {};
    }

}
