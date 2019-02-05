import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {NstedAPIQuery} from "./NstedAPIQuery";
import {PassNext} from "../../../decorators/pass-next";

@ArgsType()
class NEOUrlArgs {
    @Field({nullable: true}) public version: string = "v1";
}

@ObjectType()
@Resolver(() => ExoplanetsQuery)
export class ExoplanetsQuery {
    constructor() {
    }

    @PassNext({
        type: NstedAPIQuery,
        path: "/cgi-bin/nstedAPI",
    })
    public nsted: () => Promise<NstedAPIQuery>;
}
