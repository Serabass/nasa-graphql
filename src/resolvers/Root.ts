import {Arg, Ctx, FieldResolver, Query} from "type-graphql";
import {Context} from "../context";
import {NASAQuery} from "./Query/NASAQuery";
import {NASAImagesQuery} from "./Query/NASAImagesQuery";
import {GraphQLInt} from "graphql";

class RootQueries {
    @Query(() => NASAQuery, {nullable: true})
    public async NASA(@Ctx() ctx: Context,
                      @Arg("key") key: string): Promise<any> {
        ctx.API_KEY = key;
        ctx.rootUrl = "https://api.nasa.gov";
        return {
            currentPath: [],
        };
    }

    /**
     * @see https://api.nasa.gov/api.html#images-endpoints
     * @param ctx
     * @constructor
     */
    @Query(() => NASAImagesQuery, {nullable: true})
    public async NASAImages(@Ctx() ctx: Context): Promise<any> {
        // ctx.API_KEY = key;
        ctx.rootUrl = "https://images-api.nasa.gov";
        return {
            currentPath: [],
        };
    }

    @Query(() => GraphQLInt, {nullable: true})
    public rateLimitRemaining() {
        return (global as any).rateLimitRemaining;
    }

    @Query(() => GraphQLInt, {nullable: true})
    public rateLimit() {
        return (global as any).rateLimit;
    }
}

class RootMutations {
}
