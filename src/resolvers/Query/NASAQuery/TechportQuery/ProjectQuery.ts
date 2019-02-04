import {Field, ObjectType, Resolver} from "type-graphql";
import {Fetch} from "../../../../decorators/fetch";

@ObjectType()
class TechportProjectData {
    @Field() public benefits: string;
}

@ObjectType()
class TechportProjectResponse {
    @Field() public project: TechportProjectData;
}

@ObjectType()
@Resolver(() => ProjectQuery)
export class ProjectQuery {
    @Fetch({
        type: TechportProjectResponse,
        path: "/",
    })
    public projects: () => Promise<TechportProjectResponse>;
}
