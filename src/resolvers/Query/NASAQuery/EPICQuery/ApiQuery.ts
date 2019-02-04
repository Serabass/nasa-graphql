import {Field, ObjectType, Resolver} from "type-graphql";
import {Fetch} from "../../../../decorators/fetch";

@ObjectType()
class NaturalResponse {
    @Field() public identifier: string;
    @Field() public caption: string;
    @Field() public image: string;
    @Field() public version: string;
    @Field() public date: string;
}

@ObjectType()
@Resolver(() => ApiQuery)
export class ApiQuery {
    @Fetch({
        type: [NaturalResponse],
        path: "/natural",
    })
    public natural: () => Promise<NaturalResponse[]>;

}
