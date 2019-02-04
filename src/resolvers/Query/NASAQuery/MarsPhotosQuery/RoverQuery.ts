import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {Fetch} from "../../../../decorators/fetch";

@ObjectType()
class Photo2 {
    @Field() public id: number;
    @Field() public sol: number;
    @Field() public img_src: string;
}

@ObjectType()
class PhotosResponse2 {
    @Field(() => [Photo2]) public photos: Photo2[];
}

@ArgsType()
class RoverPhotosArgs2 {
    @Field({nullable: true}) public sol: number;
    @Field({nullable: true}) public earth_date: string;
    @Field({nullable: true}) public page: number = 1;

    // TODO See https://api.nasa.gov/api.html#MarsPhotos
    @Field({nullable: true}) public camera: string;
}

@ObjectType()
@Resolver(() => RoverQuery)
export class RoverQuery {
    constructor() {
    }

    @Fetch({
        type: PhotosResponse2,
        path: "/photos",
        args: RoverPhotosArgs2,
    })
    public photos: () => Promise<PhotosResponse2>;
}
