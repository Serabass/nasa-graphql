import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {Fetch} from "../../../../decorators/fetch";
import {RoverQuery} from "./RoverQuery";
import {PassNext} from "../../../../decorators/pass-next";

@ObjectType()
class Photo {
    @Field() public id: number;
    @Field() public sol: number;
    @Field() public img_src: string;
}

@ObjectType()
class PhotosResponse {
    @Field(() => [Photo]) public photos: Photo[];
}

@ArgsType()
class RoverArgs {
    @Field() public roverName: string;
}

@ArgsType()
class RoverPhotosArgs {
    @Field() public sol: number;
}

@ObjectType()
@Resolver(() => RoversQuery)
export class RoversQuery {
    constructor() {
    }

    @Fetch({
        type: PhotosResponse,
        path: "/:roverName/photos",
        urlArgsType: RoverArgs,
        args: RoverPhotosArgs,
    })
    public photos: () => Promise<PhotosResponse>;

    @PassNext({
        type: RoverQuery,
        path: "/:roverName",
        urlArgsType: RoverArgs,
    })
    public rover: () => Promise<RoverQuery>;
}
