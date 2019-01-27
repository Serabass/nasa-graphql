import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {Order} from "./Order";
import {Field, ObjectType} from "type-graphql";
import {ProductComment} from "./ProductComment";
import Faker from "faker";
import Seed from "../decorators/seed";

@Seed({
    amount: 50,
    fill: function (entity: User, faker: typeof Faker) {
        const gender = faker.random.number(1);
        const firstName = faker.name.firstName(gender);
        const middleName = faker.name.firstName(gender);
        const lastName = faker.name.lastName(gender);
        const email = faker.internet.email(firstName, lastName);

        entity.firstName = firstName;
        entity.middleName = middleName;
        entity.lastName = lastName;
        entity.password = '123456';
        entity.email = email;
    }
})
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
