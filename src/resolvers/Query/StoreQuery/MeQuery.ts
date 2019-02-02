import {Arg, Authorized, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository as Inject} from "typeorm-typedi-extensions";
import {Repository} from "typeorm";
import {ProductComment} from "../../../entities/ProductComment";
import {User} from "../../../entities/User";
import {CtxUser} from "../../../helpers";
import {Order} from "../../../entities/Order";
import {PaginationArgs} from "../../types/input-types";

@ObjectType()
@Resolver(() => MeQuery)
export class MeQuery {
    constructor(
        @Inject(Order) private readonly orderRepository: Repository<Order>,
        @Inject(ProductComment) private readonly productRepository: Repository<ProductComment>,
    ) {
    }

    @Authorized()
    @FieldResolver(() => [Order])
    public async orders(@CtxUser me: User,
                        @Arg("pagination", {nullable: true}) pagination: PaginationArgs,
    ): Promise<Order[]> {
        const options = pagination ? {
            ...pagination.skipTakeOptions(),
        } : {};
        return await this.orderRepository.find({
            ...options,
            where: {
                userId: me.id,
            },
        });
    }
}
