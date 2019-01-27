import {Field, ObjectType} from 'type-graphql';
import {
    Column,
    Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import Seed from "../decorators/seed";
import Faker from "faker";
import {Product} from "./Product";
import {User} from "./User";

@Seed({
    amount: 50,
    fill(entity: ProductRating, faker: typeof Faker) {
        entity.value = faker.random.number(10);
    },
    async after(em) {
        await em.query('UPDATE `product_rating` set userId = (SELECT id from user ORDER BY RAND() LIMIT 1)');
        await em.query('UPDATE `product_rating` set productId = (SELECT id from product ORDER BY RAND() LIMIT 1)');
    }
})
@Entity()
@ObjectType()
export class ProductRating {
    constructor() {
    }

    @Field({nullable: true})
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field(type => Product)
    @ManyToOne(type => Product, product => product.ratings)
    public product: Product;

    @Field(type => User)
    @ManyToOne(type => User, user => user.ratings)
    public user: User;

    @Field({nullable: true})
    @Column()
    public value: number;

}
