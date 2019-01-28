import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Field, ObjectType} from "type-graphql";
import {GraphQLID} from "graphql";
import {Product} from "./Product";
import {User} from "./User";
import Seed from "../decorators/seed";


@Seed<ProductComment>({
    amount: 50,
    fill(entity, faker) {
        entity.content = faker.company.catchPhrase();
        // entity.parent = null;
        // entity.categoryId = 1;
    },
    async after(em) {
        await em.query('UPDATE `product_comment` set userId = (SELECT id from user ORDER BY RAND() LIMIT 1)');
        await em.query('UPDATE `product_comment` set productId = (SELECT id from product ORDER BY RAND() LIMIT 1)');
    }
})
@Entity()
@ObjectType()
export class ProductComment {
    @Field(type => GraphQLID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({length: 512})
    content: string;

    @Field(type => User)
    @ManyToOne(type => User, user => user.comments)
    user: User;

    @Field(type => Product)
    @ManyToOne(type => Product, product => product.comments)
    product: Product;
}
