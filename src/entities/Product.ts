import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable} from 'typeorm';
import {Order} from "./Order";
import {Field, ObjectType} from "type-graphql";
import {ProductCategory} from "./ProductCategory";
import {ProductComment} from "./ProductComment";
import Seed from "../decorators/seed";
import Faker from "faker";

@Seed({
    amount: 50,
    fill(entity: Product, faker: typeof Faker) {
        entity.title = faker.company.catchPhrase();
        entity.description = faker.lorem.sentence();
        entity.price = faker.random.number(10000);
    },
    async after(em) {
        await em.query('UPDATE `product` set categoryId = (SELECT id from product_category ORDER BY RAND() LIMIT 1)');

    }
})
@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn()
    @Field({
        description: 'Product id'
    })
    id: number;

    @Column({length: 50})
    @Field({
        description: 'The title of the product'
    })
    title: string;

    @Column({length: 512})
    @Field({
        description: 'The description of the product'
    })
    description: string;

    @Field(type => Order, {
        description: 'Associated category'
    })
    @ManyToOne(type => ProductCategory, category => category.products)
    category: ProductCategory;

    // @Field(type => GraphQLInt, {nullable: true})
    // @RelationColumn({nullable: true})
    // public categoryId: number;

    @Field(type => [ProductComment])
    @OneToMany(type => ProductComment, comment => comment.user)
    comments: ProductComment[];

    @Column()
    @Field({
        description: 'Product price'
    })
    price: number;
}
