import {Arg, Ctx, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {Context} from "../../../context";
import {RemoteApi} from "../../../decorators/remote-api";
import RemoteSchema from "../../../decorators/remote-schema";
import {SWAPIFilmArgs} from "../../types/input-types";
import {SWAPIFilmResponse} from "../../types/object-types";
import {GraphQLInt} from "graphql";
import If from "../../../decorators/if";
import Env from "../../../env";
import {CustomScalar} from "../../types/scalar-types";

@ObjectType()
@Resolver(() => DemoQuery)
export class DemoQuery {
    constructor() {
    }

    @FieldResolver((type) => CustomScalar, {nullable: true})
    public async CustomScalar(@Arg("val", () => CustomScalar) val: any): Promise<any> {
        return val;
    }

    @FieldResolver((type) => GraphQLInt, {nullable: true})
    public async OptionalParameter(@Arg("val", {nullable: true}) val: number = 99): Promise<number> {
        return val;
    }

    @If(() => Env.SHOW_HIDDEN_RESOLVERS)(FieldResolver((type) => GraphQLInt))
    public async ConditionalDefinition(@Arg("arg") arg: number): Promise<number> {
        return arg;
    }

    @RemoteApi((type) => SWAPIFilmResponse, {nullable: true, argType: SWAPIFilmArgs}, {
        url: "https://swapi.co/api/films/:id/",
        method: "GET",
    })
    public RemoteApi: (args: SWAPIFilmArgs) => SWAPIFilmResponse;

    @RemoteSchema({
        url: "https://example.com/graphql",
        resolve(data) {
            return data;
        },
    })
    @FieldResolver((type) => Number, {nullable: true})
    public async RemoteSchema(@Ctx() ctx: Context,
                              @Arg("id") id: number): Promise<any> {
        return {};
    }
}
