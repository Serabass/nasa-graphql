import {Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {Context} from "../../context";
import {ProductQuery} from "./ProductQuery";
import {MeQuery} from "./MeQuery";
import {CartQuery} from "./CartQuery";

@ObjectType()
@Resolver(() => PaperfoxQuery)
export class PaperfoxQuery {
    constructor() {
    }

    @FieldResolver(type => ProductQuery)
    async Products(@Ctx() ctx: Context,
                   @Root() dcut: PaperfoxQuery): Promise<any> {
        return {};
    }

    @FieldResolver(type => MeQuery)
    async Me(@Ctx() ctx: Context,
             @Root() dcut: MeQuery): Promise<any> {
        return {};
    }

    @FieldResolver(type => CartQuery)
    async Cart(@Ctx() ctx,
               @Root() dcut: CartQuery): Promise<any> {
        return {};
    }
}
