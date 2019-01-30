import {ObjectType, Resolver} from "type-graphql";
import {Customer, CustomerModel} from "../../entities/mongo/Customer";
import MongoResolver, {MongoField} from "../../decorators/mongo-resolver";

@MongoResolver(CustomerModel)
@ObjectType()
@Resolver(() => CustomerQuery)
export class CustomerQuery {
    constructor() {
    }

    @MongoField("findById", Customer)
    public findById: (id: number) => Promise<Customer>;
}
