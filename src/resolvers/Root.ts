import {Arg, Ctx, Query} from "type-graphql";
import {Context} from "../context";
import {NASAQuery} from "./Query/NASAQuery";
import {NASAImagesQuery} from "./Query/NASAImagesQuery";

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
}

class RootMutations {
}
