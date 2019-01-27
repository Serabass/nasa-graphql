import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Field, ObjectType} from "type-graphql";
import {GraphQLInt} from "graphql";
import {RelationColumn} from "../helpers";
import {Product} from "./Product";
import {User} from "./User";
import Seed from "../decorators/seed";
import Faker from "faker";


@Seed({
    amount: 50,
    fill: function (entity: ProductComment, faker: typeof Faker) {
        entity.content = faker.company.catchPhrase();
        // entity.parent = null;
        // entity.categoryId = 1;
    }
})
@Entity()
@ObjectType()
export class ProductComment {
    @Field()
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
