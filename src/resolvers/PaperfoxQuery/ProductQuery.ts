import {Arg, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Product} from "../../entities/Product";
import {Repository} from "typeorm";
import {User} from "../../entities/User";
import {CtxUser} from "../../helpers";
import {PaginationArgs} from "../models/types";
import {ProductCategory} from "../../entities/ProductCategory";

@ObjectType()
@Resolver(() => ProductQuery)
export class ProductQuery {
    constructor(
        @InjectRepository(Product) private readonly products: Repository<Product>,
        @InjectRepository(ProductCategory) private readonly categoriesRepo: Repository<ProductCategory>
    ) {
    }

    @FieldResolver(() => [Product])
    public async all(@CtxUser user: User,
                     @Arg('pagination', {nullable: true}) pagination: PaginationArgs
    ) {
        return await this.products.find({});
    }

    @FieldResolver(() => [Product])
    public async categories() {
        return await this.categoriesRepo.find({});
    }
}
