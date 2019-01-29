import {Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {ProductMutation} from "./ProductMutation";
import {Context} from "../../context";
import {FeedbackMutation} from "./FeedbackMutation";

@ObjectType()
@Resolver(() => StoreMutation)
export class StoreMutation {
    constructor() {
    }

    @FieldResolver((type) => ProductMutation)
    public async Product(@Ctx() ctx: Context,
                         @Root() pf: StoreMutation): Promise<any> {
        return {};
    }

    @FieldResolver((type) => FeedbackMutation)
    public async Feedback(@Ctx() ctx: Context,
                          @Root() pf: StoreMutation): Promise<any> {
        return {};
    }

}