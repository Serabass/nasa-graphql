import {Ctx, FieldResolver, ObjectType, Query, Resolver, Root} from "type-graphql";
import {Context} from "../../context";
import {ProductQuery} from "./ProductQuery";
import {MeQuery} from "./MeQuery";
import {CartQuery} from "./CartQuery";
import {MongoQuery} from "../MongoQuery";
import {StoreSubQuery} from "./StoreSubQuery";

@ObjectType()
@Resolver(() => StoreQuery)
export class StoreQuery {
    constructor() {
    }

    @FieldResolver((type) => ProductQuery)
    public async Products(@Ctx() ctx: Context,
                          @Root() storeQuery: StoreQuery): Promise<any> {
        return {};
    }

    @FieldResolver((type) => MeQuery)
    public async Me(@Ctx() ctx: Context,
                    @Root() storeQuery: MeQuery): Promise<any> {
        return {};
    }

    @FieldResolver((type) => CartQuery)
    public async Cart(@Ctx() ctx,
                      @Root() storeQuery: CartQuery): Promise<any> {
        return {};
    }

    @FieldResolver((type) => StoreSubQuery, {nullable: true})
    public async Sub(@Ctx() ctx: Context): Promise<any> {
        return {};
    }
}
