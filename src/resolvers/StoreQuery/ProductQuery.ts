import {Arg, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository as Inject} from "typeorm-typedi-extensions";
import {Product} from "../../entities/Product";
import {Repository} from "typeorm";
import {PaginationArgs} from "../types/input-types";
import {ProductCategory} from "../../entities/ProductCategory";

@ObjectType()
@Resolver(() => ProductQuery)
export class ProductQuery {
    constructor(
        @Inject(Product) private readonly products: Repository<Product>,
        @Inject(ProductCategory) private readonly categoriesRepo: Repository<ProductCategory>,
    ) {
    }

    @FieldResolver(() => [Product], {
        nullable: true,
    })
    public async all(@Arg("pagination", {nullable: true}) pagination: PaginationArgs): Promise<Product[]> {
        const options = pagination ? {
            ...pagination.skipTakeOptions(),
        } : {};
        return await this.products.find(options);
    }

    @FieldResolver(() => [Product])
    public async search(@Arg("pagination", {nullable: true}) pagination: PaginationArgs,
                        @Arg("query", {nullable: true}) query: string,
    ): Promise<Product[]> {
        query = `%${query}%`;
        return await this.products
            .createQueryBuilder("product")
            .where("product.title like :query OR product.description like :query", {
                query,
            })
            .getMany();
    }

    @FieldResolver(() => [ProductCategory])
    public async categories(
        @Arg("pagination", {nullable: true}) pagination: PaginationArgs,
    ) {
        const options = pagination ? {
            ...pagination.skipTakeOptions(),
        } : {};
        return await this.categoriesRepo.find(options);
    }
}
