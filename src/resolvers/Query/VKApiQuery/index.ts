import {Field, InputType, ObjectType, Resolver} from "type-graphql";
import VKAPI from "../../../decorators/examples/vk";
import {GraphQLInt} from "graphql";
import VK from "vk-io";
import Env from "../../../env";

@InputType()
class UsersParams {
    @Field(() => [GraphQLInt]) public user_ids: string[];
}

@ObjectType()
class UserResult {
    @Field(() => GraphQLInt) public id: number;
    @Field(() => String) public first_name: number;
    @Field(() => String) public last_name: number;
}

@ObjectType()
@Resolver(() => VKApiQuery)
export class VKApiQuery {

    private vk: VK;

    constructor() {
        this.vk = new VK();
        this.vk.token = Env.VK_TOKEN;
    }

    @VKAPI<any>(() => [UserResult], {
        method: "users.get",
        params: UsersParams,
    })
    public users: (params: UsersParams) => Promise<UserResult[]>;
}
