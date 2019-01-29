import {Arg, Authorized, Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {Repository} from "typeorm";
import {InjectRepository as Inject} from "typeorm-typedi-extensions";
import {Context} from "../../context";
import {Order} from "../../entities/Order";
import {FeedbackInfoArgs} from "../types/input-types";

@ObjectType()
@Resolver(() => FeedbackMutation)
export class FeedbackMutation {
    constructor(
        @Inject(Order) private readonly orderRepository: Repository<Order>,
    ) {
    }

    @Authorized()
    @FieldResolver((type) => Boolean)
    public async submit(@Root() projectsQuery: FeedbackMutation,
                        @Ctx() ctx: Context,
                        @Arg("feedbackInfo") info: FeedbackInfoArgs): Promise<boolean> {
        return {} as any;
    }
}
