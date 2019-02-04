import {ArgsType, Field, ObjectType, Resolver} from "type-graphql";
import {APODResponse} from "../../../types/object-types";
import {PassNext} from "../../../../decorators/pass-next";
import {EarthQuery} from "./EarthQuery";
import {Fetch} from "../../../../decorators/fetch";

@ArgsType()
class APODArgs {
    @Field({nullable: true}) public date: string;
    @Field({nullable: true}) public hd: boolean;
}

@ObjectType()
@Resolver(() => PlanetaryQuery)
export class PlanetaryQuery {
    constructor() {
    }

    @Fetch({
        type: APODResponse,
        path: "/apod",
        args: APODArgs,
    })
    public apod: () => Promise<APODResponse>;

    @PassNext({
        type: EarthQuery,
        path: "/earth",
    })
    public earth: () => Promise<EarthQuery>;
}
