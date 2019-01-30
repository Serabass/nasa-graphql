import {FieldResolver, ObjectType, Resolver} from "type-graphql";
import {Customer, CustomerModel} from "../../entities/mongo/Customer";
import MongoResolver, {MongoFieldResolver} from "../../decorators/mongo-resolver";
import {CustomerQuery} from "./CustomerQuery";

@ObjectType()
@Resolver(() => MongoQuery)
@MongoResolver(CustomerModel)
export class MongoQuery {
    constructor() {
    }

    @FieldResolver(() => CustomerQuery)
    public async Customer(): Promise<any> {
        return {};
    }
}
