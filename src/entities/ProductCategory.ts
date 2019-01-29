import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Order} from "./Order";
import {Field, ObjectType} from "type-graphql";
import {Product} from "./Product";
import Seed from "../decorators/seed";

@Seed<ProductCategory>({
    amount: 50,
    fill(entity, faker) {
        entity.title = faker.company.catchPhrase();
        entity.description = faker.lorem.sentence();
    },
    async after(em) {
        // await em.query(`UPDATE `product_category` set parentId =
        // (SELECT id from product_category ORDER BY RAND() LIMIT 1)`);
    },
})
@Entity()
@ObjectType()
export class ProductCategory {
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

    @Column({length: 50})
    @Field({
        description: "The description of the product",
    })
    public description: string;

    @Field((type) => Order, {
        description: "Associated project",
    })
    @ManyToOne((type) => ProductCategory, (category) => category.products)
    public parent: ProductCategory;

    @Field((type) => [Product], {
        description: "The list of scenes",
    })
    @OneToMany((type) => Product, (product) => product.category)
    public products: Product[];
}
