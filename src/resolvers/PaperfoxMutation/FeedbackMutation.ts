import {Arg, Authorized, Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Order} from "../../entities/Order";
import {Repository} from "typeorm";
import {User} from "../../entities/User";
import {Cart} from "../../entities/Cart";
import {CartArgs, FeedbackInfoArgs} from "../models/types";

@ObjectType()
@Resolver(() => FeedbackMutation)
export class FeedbackMutation {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) {
    }

    @Authorized()
    @FieldResolver(type => [Order])
    async submit(@Root() projectsQuery: FeedbackMutation,
                 @Ctx() ctx,
                 @Arg('feedbackInfo') cart: FeedbackInfoArgs): Promise<Order[]> {
        return <any>{};
    }
}
