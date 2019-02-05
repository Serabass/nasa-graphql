import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {PassNext} from "../../../../decorators/pass-next";
import {RoversQuery} from "./RoversQuery";

@ArgsType()
class RoversArgs {
    @Field({nullable: true}) public version: string = "v1";
}

/**
 * @see https://api.nasa.gov/api.html#MarsPhotos
 */
@ObjectType()
@Resolver(() => MarsPhotosQuery)
export class MarsPhotosQuery {
    constructor() {
    }

    @PassNext({
        type: RoversQuery,
        path: "/api/:version/rovers",
        urlArgsType: RoversArgs,
    })
    public rovers: () => Promise<RoversQuery>;

    // @FieldResolver((type) => EarthQuery)
    // public async earth(@Ctx() ctx: Context, @Info() info: GraphQLResolveInfo): Promise<any> {
    //     // debugger;
    //     info;
    //     ctx.pathChunks = ["planetary", "earth"];
    //     return {};
    // }
}
