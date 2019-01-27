import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {Order} from "./Order";
import {Field, ObjectType} from "type-graphql";
import {ProductComment} from "./ProductComment";

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({length: 50})
    @Field()
    firstName: string;

    @Column({length: 50})
    @Field()
    middleName: string;

    @Column({length: 50})
    @Field()
    lastName: string;

    @Column({unique: true})
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Field(type => [ProductComment])
    @OneToMany(type => ProductComment, comment => comment.user)
    comments: ProductComment[];

    @Field(type => [Order])
    @OneToMany(type => Order, order => order.user)
    orders: Order[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    /**
     * Compare a password against the user entity
     *
     * @param {string} attempt
     * @returns {Promise<boolean>}
     */
    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}
