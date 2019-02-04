import {ArgsType, Ctx, Field, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {PassNext} from "../../../../decorators/pass-next";
import {ProjectsQuery} from "./ProjectsQuery";

@ObjectType()
@Resolver(() => TechportQuery)
export class TechportQuery {
    constructor() {
    }

    @PassNext({
        type: ProjectsQuery,
        path: "/api/projects",
    })
    public projects: () => Promise<ProjectsQuery>;
}
