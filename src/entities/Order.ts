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
import Seed from "../decorators/seed";

@Seed<Order>({
    amount: 50,
    fill(entity, faker) {
        entity.description = faker.lorem.sentence();
        entity.title = faker.lorem.word();
    },
    async after(em) {
        await em.query('UPDATE `order` set userId = (SELECT id from user ORDER BY RAND() LIMIT 1)');
    }
})
@Entity()
@ObjectType()
export class Order {
    constructor() {
    }

    @Field({nullable: true})
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field({nullable: true})
    @Column()
    public title: string;

    @Field({nullable: true})
    @Column()
    public description: string;

    @Field(type => User, {nullable: true})
    @ManyToOne(type => User, user => user.orders)
    @JoinColumn()
    public user: User;

    @Field(type => [Product], {nullable: false})
    @OneToMany(type => Product, product => product.category)
    @JoinTable()
    public products: Product[];

    @Field({nullable: true, description: 'Date Time the order was created'})
    @CreateDateColumn()
    public createdDate: Date;

    @Field({nullable: true})
    @UpdateDateColumn()
    public updatedDate: Date;
}
