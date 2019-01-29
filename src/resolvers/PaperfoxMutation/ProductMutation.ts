import {Arg, Authorized, Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {InjectRepository as Inject} from "typeorm-typedi-extensions";
import {Order} from "../../entities/Order";
import {Repository} from "typeorm";
import {CartArgs} from "../types/input-types";

@ObjectType()
@Resolver(() => ProductMutation)
export class ProductMutation {
    constructor(
        @Inject(Order) private readonly orderRepository: Repository<Order>,
    ) {
    }

    @Authorized()
    @FieldResolver((type) => [Order])
    public async createOrder(@Root() projectsQuery: ProductMutation,
                             @Ctx() ctx,
                             @Arg("cart") cart: CartArgs): Promise<Order> {
        return this.orderRepository.create();
    }
}
