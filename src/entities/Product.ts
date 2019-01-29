import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable} from "typeorm";
import {Order} from "./Order";
import {Field, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {ProductCategory} from "./ProductCategory";
import {ProductComment} from "./ProductComment";
import Seed from "../decorators/seed";
import {ProductRating} from "./ProductRating";

@Seed<Product>({
    amount: 50,
    fill(entity, faker) {
        entity.title = faker.company.catchPhrase();
        entity.description = faker.lorem.sentence();
        entity.price = faker.random.number(10000);
    },
    async after(em) {
        await em.query("UPDATE `product` set categoryId = (SELECT id from product_category ORDER BY RAND() LIMIT 1)");

    },
})
@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn()
    @Field({
        description: "Product id",
    })
    public id: number;

    @Column({length: 50})
    @Field({
        description: "The title of the product",
    })
    public title: string;

    @Column({length: 512})
    @Field({
        description: "The description of the product",
    })
    public description: string;

    @Field((type) => Order, {
        description: "Associated category",
    })
    @ManyToOne((type) => ProductCategory, (category) => category.products)
    public category: ProductCategory;

    // @Field(type => GraphQLInt, {nullable: true})
    // @RelationColumn({nullable: true})
    // public categoryId: number;

    @Field((type) => [ProductComment])
    @OneToMany((type) => ProductComment, (comment) => comment.user)
    public comments: ProductComment[];

    @Field((type) => [ProductRating])
    @OneToMany((type) => ProductRating, (rating) => rating.product)
    public ratings: ProductRating[];

    @Column()
    @Field({
        description: "Product price",
    })
    public price: number;
}

@Resolver(Product)
export class ProductResolvers {
    @FieldResolver((type) => [String])
    public images(): string[] {
        const result = [];
        const count = Math.floor(Math.random() * 10);

        for (let i = 0; i < count; i++) {
            result.push("https://dummyimage.com/600x400/000/fff.png");
        }

        return result;
    }
}
