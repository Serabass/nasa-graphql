import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable} from 'typeorm';
import {Order} from "./Order";
import {Field, ObjectType} from "type-graphql";
import {ProductCategory} from "./ProductCategory";
import {ProductComment} from "./ProductComment";

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

    @Field(type => [ProductComment])
    @OneToMany(type => ProductComment, comment => comment.user)
    comments: ProductComment[];

    @Column()
    @Field({
        description: 'Product price'
    })
    price: number;
}
