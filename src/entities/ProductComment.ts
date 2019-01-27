import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Field, ObjectType} from "type-graphql";
import {GraphQLInt} from "graphql";
import {RelationColumn} from "../helpers";
import {Product} from "./Product";
import {User} from "./User";

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

    @Field(type => GraphQLInt)
    @RelationColumn({
        nullable: false
    })
    productId: number;
}
