import {Arg, Authorized, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository as Inject} from "typeorm-typedi-extensions";
import {Repository} from "typeorm";
import {ProductComment} from "../../entities/ProductComment";
import {User} from "../../entities/User";
import {CtxUser} from "../../helpers";
import {Cart} from "../../entities/Cart";

@ObjectType()
@Resolver(() => CartQuery)
export class CartQuery {
    constructor(
        @Inject(Cart) private readonly cartRepo: Repository<Cart>,
        @Inject(ProductComment) private readonly sceneRepository: Repository<ProductComment>) {
    }

    @Authorized()
    @FieldResolver(() => Cart)
    public async getCart(@CtxUser user: User,
                         @Arg("id") id: number,
    ): Promise<Cart> {
        return await this.cartRepo.findOne({id}, {});
    }
}
