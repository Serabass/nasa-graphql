import {Arg, Authorized, Ctx, FieldResolver, ObjectType, Resolver, Root} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Order} from "../../entities/Order";
import {Repository} from "typeorm";
import {User} from "../../entities/User";
import {Cart} from "../../entities/Cart";
import {CartArgs} from "../models/types";

@ObjectType()
@Resolver(() => ProductMutation)
export class ProductMutation {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) {
    }

    @FieldResolver(type => [Order])
    async createOrder(@Root() projectsQuery: ProductMutation,
                 @Ctx() ctx,
                 @Arg('cart') cart: CartArgs): Promise<Order[]> {
        return this.orderRepository.find({
            relations: [
                'user',
                'movies'
            ],
            where: {
                public: true
            }
        });
    }

    @Authorized()
    @FieldResolver(() => [Order])
    my(@Ctx('user') user: User,
       @Arg('page', {nullable: true}) page: number = 1,
       @Arg('perPage', {nullable: true}) perPage: number = 10): Promise<Order[]> {
        return this.orderRepository.find({
            relations: [
                'movies'
            ],
            where: {
                userId: user.id
            }
        });
    }
}
