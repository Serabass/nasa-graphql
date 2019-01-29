import {Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {Context} from "../../context";
import {ProductQuery} from "./ProductQuery";
import {MeQuery} from "./MeQuery";
import {CartQuery} from "./CartQuery";

@ObjectType()
@Resolver(() => StoreQuery)
export class StoreQuery {
    constructor() {
    }

    @FieldResolver((type) => ProductQuery)
    public async Products(@Ctx() ctx: Context,
                          @Root() dcut: StoreQuery): Promise<any> {
        return {};
    }

    @FieldResolver((type) => MeQuery)
    public async Me(@Ctx() ctx: Context,
                    @Root() dcut: MeQuery): Promise<any> {
        return {};
    }

    @FieldResolver((type) => CartQuery)
    public async Cart(@Ctx() ctx,
                      @Root() dcut: CartQuery): Promise<any> {
        return {};
    }
}
