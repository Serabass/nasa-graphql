import {Arg, Args, Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {Context} from "../../context";
import {ProductQuery} from "./ProductQuery";
import {MeQuery} from "./MeQuery";
import {CartQuery} from "./CartQuery";
import {StoreSubQuery} from "./StoreSubQuery";
import {RemoteApi} from "../../decorators/remote-api";
import RemoteSchema from "../../decorators/remote-schema";
import {SWAPIFilmArgs} from "../types/input-types";
import {SWAPIFilmResponse} from "../types/object-types";

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

    @FieldResolver((type) => Number, {nullable: true})
    public async num(@Ctx() ctx: Context): Promise<number> {
        return 666;
    }

    @RemoteApi((type) => SWAPIFilmResponse, {nullable: true, argType: SWAPIFilmArgs}, {
        url: "https://swapi.co/api/films/:id/",
    })
    public RemoteApi: any;

    @RemoteSchema({
        url: "https://graph.ps.kz/",
        resolve(data) {
            return data;
        },
    })
    @FieldResolver((type) => Number, {nullable: true})
    public async RemoteSchema(@Ctx() ctx: Context,
                              @Arg("id") id: number): Promise<any> {
        debugger;
        return {};
    }
}
