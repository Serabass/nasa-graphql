import {ArgsType, Field, ObjectType, Resolver, Root} from "type-graphql";
import {PassNext} from "../../../decorators/pass-next";
import {Fetch} from "../../../decorators/fetch";

@ObjectType()
class SearchCollectionResponse {
    @Field() public href: string;
}

@ObjectType()
class SearchResponse {
    @Field(() => SearchCollectionResponse) public collection: SearchCollectionResponse;
}

@ObjectType()
class LocationResponse {
    @Field() public location: string;
}

@ArgsType()
class SearchArgs {
    @Field({nullable: true}) public q: string;
    @Field({nullable: true}) public center: string;
    @Field({nullable: true}) public description: string;
    @Field({nullable: true}) public description_508: string;
    @Field({nullable: true}) public keywords: string;
    @Field({nullable: true}) public location: string;
    @Field({nullable: true}) public media_type: string;
    @Field({nullable: true}) public nasa_id: string;
    @Field({nullable: true}) public photographer: string;
    @Field({nullable: true}) public secondary_creator: string;
    @Field({nullable: true}) public title: string;
    @Field({nullable: true}) public year_start: string;
    @Field({nullable: true}) public year_end: string;
}

@ArgsType()
class NASAImageArgs {
    @Field() public nasaId: string;
}

/**
 * @see https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
 */
@ObjectType()
@Resolver(() => NASAImagesQuery)
export class NASAImagesQuery {
    constructor() {
    }

    @Fetch({
        type: SearchResponse,
        path: "/search",
        args: SearchArgs,
    })
    public search: () => Promise<SearchResponse>;

    @Fetch({
        type: SearchResponse,
        path: "/asset/:nasaId",
        urlArgsType: NASAImageArgs,
    })
    public asset: () => Promise<SearchResponse>;

    @Fetch({
        type: LocationResponse,
        path: "/metadata/:nasaId",
        urlArgsType: NASAImageArgs,
    })
    public metadata: () => Promise<LocationResponse>;

    @Fetch({
        type: LocationResponse,
        path: "/captions/:nasaId",
        urlArgsType: NASAImageArgs,
    })
    public captions: () => Promise<LocationResponse>;
}
