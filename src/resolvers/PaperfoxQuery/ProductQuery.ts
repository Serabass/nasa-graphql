import {Arg, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {InjectRepository} from "typeorm-typedi-extensions";
import {Product} from "../../entities/Product";
import {Repository} from "typeorm";
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
    public async all(@Arg('pagination', {nullable: true}) pagination: PaginationArgs) {
        let options = pagination ? {
            ...pagination.skipTakeOptions()
        } : {};
        return await this.products.find(options);
    }

    @FieldResolver(() => [Product])
    public async search(@Arg('pagination', {nullable: true}) pagination: PaginationArgs,
                        @Arg('query', {nullable: true}) query: string,
    ) {
        query = `%${query}%`;
        return await this.products
            .createQueryBuilder('product')
            .where('product.title like :query OR product.description like :query', {
                query
            })
            .getMany();
    }

    @FieldResolver(() => [Product])
    public async categories(@Arg('pagination', {nullable: true}) pagination: PaginationArgs) {
        let options = pagination ? {
            ...pagination.skipTakeOptions()
        } : {};
        return await this.categoriesRepo.find(options);
    }
}
