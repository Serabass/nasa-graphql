import {ArgsType, Field, ObjectType, Resolver, Root} from "type-graphql";
import {PassNext} from "../../../../decorators/pass-next";
import {Fetch} from "../../../../decorators/fetch";
import {ProjectQuery} from "./ProjectQuery";

@ObjectType()
class Project {
    @Field() public lastUpdated: string;
    @Field() public id: number;
}

@ObjectType()
class ProjectsResponse {
    @Field() public totalCount: number;
    @Field(() => Project) public projects: Project[];
}

@ObjectType()
class TechportProjectsResponse {
    @Field() public projects: ProjectsResponse;
}

@ArgsType()
class TechportProjectsUrlArgs {
    @Field() public id: number;
}

@ArgsType()
class TechportProjectsArgs {
    @Field({nullable: true}) public updatedSince: string;
}

@ObjectType()
@Resolver(() => ProjectsQuery)
export class ProjectsQuery {
    constructor() {
    }

    @Fetch({
        type: TechportProjectsResponse,
        path: "/",
        args: TechportProjectsArgs,
    })
    public projects: () => Promise<TechportProjectsResponse>;

    @PassNext({
        type: ProjectQuery,
        path: "/:id",
        urlArgsType: TechportProjectsUrlArgs,
    })
    public project: () => Promise<ProjectQuery>;
}
