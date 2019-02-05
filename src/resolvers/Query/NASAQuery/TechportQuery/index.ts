import {ObjectType, Resolver} from "type-graphql";
import {PassNext} from "../../../../decorators/pass-next";
import {ProjectsQuery} from "./ProjectsQuery";

/**
 * @see https://api.nasa.gov/api.html#techport
 */
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
