import {Field, ObjectType} from 'type-graphql';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    OneToMany, JoinTable
} from 'typeorm';
import {CartItem} from "./CartItem";

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
