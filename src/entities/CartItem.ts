import {Field, ObjectType} from 'type-graphql';
import {
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn
} from 'typeorm';
import {Product} from "./Product";
import {GraphQLInt} from "graphql";
import {Cart} from "./Cart";
import Seed from "../decorators/seed";

@Seed<CartItem>({
    amount: 50,
    fill(entity, faker) {
        entity.count = faker.random.number(90)
    },
    async after(em) {
        await em.query('UPDATE cart_item set productId = (SELECT id from product ORDER BY RAND() LIMIT 1)');
        await em.query('UPDATE cart_item set cartId = (SELECT id from cart ORDER BY RAND() LIMIT 1)');

    }
})
@Entity()
@ObjectType()
export class CartItem {
    constructor() {
    }

    @Field({nullable: true})
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field(type => Product, {nullable: true})
    @ManyToOne(type => Product, product => null)
    @JoinColumn()
    public product: Product;

    @Field(type => Cart, {nullable: true})
    @ManyToOne(type => Cart, cart => cart.items)
    @JoinColumn()
    public cart: Cart;

    @Field(type => GraphQLInt, {nullable: true})
    @Column()
    public count: number;

}
