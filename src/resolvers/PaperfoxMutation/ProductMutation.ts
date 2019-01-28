import {Arg, Authorized, Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Order} from "../../entities/Order";
import {Repository} from "typeorm";
import {CartArgs} from "../models/types";

@ObjectType()
@Resolver(() => ProductMutation)
export class ProductMutation {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) {
    }

    @Authorized()
    @FieldResolver(type => [Order])
    async createOrder(@Root() projectsQuery: ProductMutation,
                      @Ctx() ctx,
                      @Arg('cart') cart: CartArgs): Promise<Order[]> {
        return this.orderRepository.find();
    }
}
