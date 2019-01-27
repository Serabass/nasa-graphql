import {Arg, Authorized, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Product} from "../../entities/Product";
import {Repository} from "typeorm";
import {ProductComment} from "../../entities/ProductComment";
import {User} from "../../entities/User";
import {CtxUser} from "../../helpers";
import {Cart} from "../../entities/Cart";

@ObjectType()
@Resolver(() => CartQuery)
export class CartQuery {
    constructor(
        @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
        @InjectRepository(ProductComment) private readonly sceneRepository: Repository<ProductComment>
    ) {
    }

    @Authorized()
    @FieldResolver(() => Product)
    public async getCart(@CtxUser user: User,
                         @Arg('id') id: number
    ) {
        return await this.cartRepo.findOne({id}, {});
    }
}
