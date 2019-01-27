import {Arg, Authorized, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Repository} from "typeorm";
import {ProductComment} from "../../entities/ProductComment";
import {User} from "../../entities/User";
import {CtxUser} from "../../helpers";
import {Order} from "../../entities/Order";
import {PaginationArgs} from "../models/types";

@ObjectType()
@Resolver(() => MeQuery)
export class MeQuery {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(ProductComment) private readonly sceneRepository: Repository<ProductComment>
    ) {
    }

    @Authorized()
    @FieldResolver(() => [Order])
    public async orders(@CtxUser me: User,
                        @Arg('pagination', {nullable: true}) pagination: PaginationArgs
    ) {
        let options = pagination ? {
            ...pagination.skipTakeOptions()
        } : {};
        return await this.orderRepository.find({
            ...options,
            where: {
                userId: me.id
            },
        });
    }
}
