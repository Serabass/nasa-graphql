import {Field, ObjectType} from 'type-graphql';
import {
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    OneToMany, JoinTable, JoinColumn
} from 'typeorm';
import {User} from './User';
import {Product} from "./Product";
import {RelationColumn} from "../helpers";
import {GraphQLInt} from "graphql";
import {Cart} from "./Cart";
import Seed from "../decorators/seed";
import Faker from "faker";

@Seed({
    amount: 50,
    fill: function (entity: CartItem, faker: typeof Faker) {
        entity.count = faker.random.number(90)
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
