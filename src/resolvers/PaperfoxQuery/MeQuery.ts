import {Arg, Authorized, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Product} from "../../entities/Product";
import {Repository} from "typeorm";
import {ProductComment} from "../../entities/ProductComment";
import {User} from "../../entities/User";
import {CtxUser} from "../../helpers";

@ObjectType()
@Resolver(() => MeQuery)
export class MeQuery {
    constructor(
        @InjectRepository(Product) private readonly movieRepository: Repository<Product>,
        @InjectRepository(ProductComment) private readonly sceneRepository: Repository<ProductComment>
    ) {
    }

    @Authorized()
    @FieldResolver(() => Product)
    public async movie(@CtxUser user: User,
                       @Arg('id') id: number
    ) {
        return {};
    }
}
