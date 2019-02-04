import {ArgsType, Ctx, Field, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {PlanetaryQuery} from "./PlanetaryQuery";
import {PassNext} from "../../../decorators/pass-next";
import {MarsPhotosQuery} from "./MarsPhotosQuery";
import {NeoQuery} from "./NeoQuery";
import {EPICQuery} from "./EPICQuery";
import {GraphQLInt} from "graphql";
import {Context} from "../../../context";
import {TechportQuery} from "./TechportQuery";

@ArgsType()
class NEOUrlArgs {
    @Field({nullable: true}) public version: string = "v1";
}

@ObjectType()
@Resolver(() => NASAQuery)
export class NASAQuery {
    constructor() {
    }

    @PassNext({
        type: PlanetaryQuery,
        path: "/planetary",
    })
    public planetary: () => Promise<PlanetaryQuery>;

    @PassNext({
        type: MarsPhotosQuery,
        path: "/mars-photos",
    })
    public marsPhotos: () => Promise<MarsPhotosQuery>;

    @PassNext({
        type: NeoQuery,
        path: "/neo/rest/:version",
        urlArgsType: NEOUrlArgs,
    })
    public neo: () => Promise<NeoQuery>;

    @PassNext({
        type: EPICQuery,
        path: "/EPIC",
    })
    public EPIC: () => Promise<EPICQuery>;

    @PassNext({
        type: TechportQuery,
        path: "/techport",
    })
    public techport: () => Promise<TechportQuery>;
}
