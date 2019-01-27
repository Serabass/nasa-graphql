import {Arg, Authorized, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Product} from "../../entities/Product";
import {Repository} from "typeorm";
import {ProductComment} from "../../entities/ProductComment";
import {User} from "../../entities/User";
import {CtxUser} from "../../helpers";

@ObjectType()
@Resolver(() => CartQuery)
export class CartQuery {
    constructor(
        @InjectRepository(Product) private readonly movieRepository: Repository<Product>,
        @InjectRepository(ProductComment) private readonly sceneRepository: Repository<ProductComment>
    ) {
    }

    @Authorized()
    @FieldResolver(() => Product)
    public async getCart(@CtxUser user: User,
                         @Arg('id') id: number
    ) {
        let movie = await this.movieRepository.findOne({id}, {
            relations: [
                'scenes',
                'project'
            ],
        });

        return movie;
    }
}
