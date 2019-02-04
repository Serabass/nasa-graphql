import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {Fetch} from "../../../../decorators/fetch";
import {GraphQLInt} from "graphql";

@ObjectType()
class NEOObject {
    @Field() public neo_reference_id: string;
    @Field() public name: string;
}

@ObjectType()
class NeoBrowseResponse {
    @Field(() => [NEOObject]) public near_earth_objects: NEOObject[];
}

@ObjectType()
class NeoFeedResponse {
    @Field() public element_count: number;
}

@ObjectType()
class NeoResponse {
    @Field() public id: string;
    @Field() public neo_reference_id: string;
    @Field() public name: string;

    @Field()
    public get sandbox(): string {
        return `${this.id}__${this.name}`;
    }
}

@ArgsType()
class NeoArgs {
    @Field(() => GraphQLInt) public id: number;
}

@ObjectType()
@Resolver(() => NeoQuery)
export class NeoQuery {
    constructor() {
    }

    @Fetch({
        type: NeoFeedResponse,
        path: "feed",
    })
    public feed: () => Promise<NeoFeedResponse>;

    @Fetch({
        type: NeoResponse,
        path: "/neo/:id",
        urlArgsType: NeoArgs,
    })
    public neo: () => Promise<NeoResponse>;

    @Fetch({
        type: NeoBrowseResponse,
        path: "/neo/browse",
    })
    public browse: () => Promise<NeoBrowseResponse>;
}
