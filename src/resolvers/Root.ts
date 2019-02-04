import {Arg, Ctx, Query, Root} from "type-graphql";
import {Context} from "../context";
import {NASAQuery} from "./Query/NASAQuery";

class RootQueries {
    @Query(() => NASAQuery, {nullable: true})
    public async NASA(@Ctx() ctx: Context,
                      @Arg("key") key: string = "tenTCxpvlpJUNfzED5FOJjMo9bjRNMNKkxgBj2Wz"): Promise<any> {
        ctx.API_KEY = key;
        ctx.rootUrl = "https://api.nasa.gov";
        return {
            currentPath: [],
        };
    }
}

class RootMutations {
}
