import {Arg, Authorized, Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {Context} from "../../context";
import {FeedbackInfoArgs} from "../types/input-types";

@ObjectType()
@Resolver(() => FeedbackMutation)
export class FeedbackMutation {
    constructor(
        // @Inject(Order) private readonly orderRepository: Repository<Order>,
    ) {
    }

    @Authorized()
    @FieldResolver((type) => Boolean)
    public async submit(@Root() projectsQuery: FeedbackMutation,
                        @Ctx() ctx: Context,
                        @Arg("feedbackInfo") info: FeedbackInfoArgs): Promise<boolean> {
        debugger;
        ctx;
        return true;
    }
}
