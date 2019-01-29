import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany} from "typeorm";
import * as bcrypt from "bcryptjs";
import {Order} from "./Order";
import {Field, ObjectType} from "type-graphql";
import {ProductComment} from "./ProductComment";
import Seed from "../decorators/seed";
import {ProductRating} from "./ProductRating";

@Seed<User>({
    amount: 50,
    fill(entity, faker) {
        const gender = faker.random.number(1);
        const firstName = faker.name.firstName(gender);
        const middleName = faker.name.firstName(gender);
        const lastName = faker.name.lastName(gender);

        entity.firstName = firstName;
        entity.middleName = middleName;
        entity.lastName = lastName;
        entity.password = "123456";
        entity.email = faker.internet.email(firstName, lastName);
    },
})
@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field()
    public id: number;

    @Column({length: 50})
    @Field()
    public firstName: string;

    @Column({length: 50})
    @Field()
    public middleName: string;

    @Column({length: 50})
    @Field()
    public lastName: string;

    @Column({unique: true})
    @Field()
    public email: string;

    @Column()
    @Field()
    public password: string;

    @Field((type) => [ProductComment])
    @OneToMany((type) => ProductComment, (comment) => comment.user)
    public comments: ProductComment[];

    @Field((type) => [Order])
    @OneToMany((type) => Order, (order) => order.user)
    public orders: Order[];

    @Field((type) => [ProductRating])
    @OneToMany((type) => ProductRating, (rating) => rating.product)
    public ratings: ProductRating[];

    @BeforeInsert()
    public async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    /**
     * Compare a password against the user entity
     *
     * @param {string} attempt
     * @returns {Promise<boolean>}
     */
    public async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}
