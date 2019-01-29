import {Ctx, FieldResolver, ObjectType, Query, Resolver, Root} from "type-graphql";
import {Context} from "../../context";
import {ProductQuery} from "./ProductQuery";

@ObjectType()
@Resolver(() => StoreSubQuery)
export class StoreSubQuery {
    constructor() {
    }

    @FieldResolver((type) => ProductQuery)
    public async Products(@Ctx() ctx: Context,
                          @Root() storeQuery: StoreSubQuery): Promise<any> {
        return {};
    }

}
