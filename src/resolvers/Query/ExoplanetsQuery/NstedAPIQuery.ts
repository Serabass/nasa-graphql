import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {Fetch} from "../../../decorators/fetch";

@ArgsType()
class NstedAPIArgs {
    @Field() public table: string;
    @Field({nullable: true}) public format: string = "json";
    @Field() public where: string;
}

@ObjectType()
class NstedAPIResponse {
    @Field() public pl_hostname: string;
    @Field() public pl_letter: string;
}

@ObjectType()
@Resolver(() => NstedAPIQuery)
export class NstedAPIQuery {
    constructor() {
    }

    @Fetch({
        type: [NstedAPIResponse],
        path: "/nph-nstedAPI",
        args: NstedAPIArgs,
    })
    public nph: () => Promise<NstedAPIResponse[]>;
}
