import {Field, ObjectType} from 'type-graphql';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    OneToMany, JoinTable
} from 'typeorm';
import {CartItem} from "./CartItem";
import Seed from "../decorators/seed";
import Faker from "faker";

@Seed({
    amount: 50,
    fill: function (entity: Cart, faker: typeof Faker) {
        entity.sum = faker.random.number(90000);
    }
})
@Entity()
@ObjectType()
export class Cart {
    constructor() {
    }

    @Field({nullable: true})
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field(type => [CartItem], {nullable: true})
    @OneToMany(type => CartItem, cartItem => cartItem.cart)
    @JoinTable()
    public items: CartItem[];

    @Field({nullable: true})
    @Column()
    public sum: number;
}
