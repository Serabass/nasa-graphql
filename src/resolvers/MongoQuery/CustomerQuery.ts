import {FieldResolver, ObjectType, Resolver} from "type-graphql";
import {Customer, CustomerModel} from "../../entities/mongo/Customer";
import MongoResolver, {MongoFieldResolver} from "../../decorators/mongo-resolver";
import {MongoQueryBase} from "./MongoQueryBase";

@MongoResolver(CustomerModel)
@ObjectType()
@Resolver(() => CustomerQuery)
export class CustomerQuery extends MongoQueryBase {
    @FieldResolver(() => Number)
    public async sandbox(): Promise<number> {
        return 123;
    }
}
