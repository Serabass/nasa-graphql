import {Field, ObjectType} from "type-graphql";
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
} from "typeorm";
import Seed from "../decorators/seed";

@Seed<Feedback>({
    amount: 50,
    fill(entity, faker) {
        const gender = faker.random.number(1);
        const firstName = faker.name.firstName(gender);
        const lastName = faker.name.lastName(gender);
        entity.fullName = `${firstName} ${lastName}`;
        entity.email = faker.internet.email(firstName, lastName);
        entity.content = faker.lorem.paragraphs(2);
        entity.phone = faker.phone.phoneNumber();
    },
    async after(em) {
    },
})
@Entity()
@ObjectType()
export class Feedback {
    constructor() {
    }

    @Field({nullable: true})
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @Field({nullable: true})
    @Column()
    public fullName: string;

    @Field({nullable: true})
    @Column()
    public email: string;

    @Field({nullable: true})
    @Column()
    public phone: string;

    @Field({nullable: true})
    @Column()
    public content: string;
}
