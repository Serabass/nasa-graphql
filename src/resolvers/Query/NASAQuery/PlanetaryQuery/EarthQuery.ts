import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {Fetch} from "../../../../decorators/fetch";

@ArgsType()
export class ImageryArgs {
    @Field() public lon: number;
    @Field() public lat: number;
    @Field() public date: string;
    @Field() public cloud_score: boolean;
}

@ArgsType()
export class AssetsArgs {
    @Field() public lon: number;
    @Field() public lat: number;
    @Field() public begin: string;
}

@ObjectType()
export class ImageryResponse {
    @Field() public cloud_score: number;
    @Field() public date: string;
    @Field() public id: string;
    @Field() public service_version: string;
    // @Field() public resource: any;
    @Field() public url: string;
}

@ObjectType()
class Asset {
    @Field() public id: string;
    @Field() public date: string;
}

@ObjectType()
export class AssetsResponse {
    @Field() public count: number;
    @Field(() => [Asset]) public results: Asset[];
}

@ObjectType()
@Resolver(() => EarthQuery)
export class EarthQuery {
    constructor() {
    }

    @Fetch({
        type: ImageryResponse,
        path: "/imagery",
        args: ImageryArgs,
        slash: true,
    })
    public imagery: () => Promise<ImageryResponse>;

    @Fetch({
        type: AssetsResponse,
        path: "/assets",
        args: AssetsArgs,
        slash: false,
    })
    public assets: () => Promise<AssetsResponse>;
}
