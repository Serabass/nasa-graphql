import {ObjectType} from "type-graphql";
import {Customer, CustomerModel} from "../../entities/mongo/Customer";
import MongoResolver, {MongoFieldResolver} from "../../decorators/mongo-resolver";
import {MongoQueryBase} from "./MongoQueryBase";
import {GraphQLInt} from "graphql";

@ObjectType()
@MongoResolver(CustomerModel)
export class CustomerQuery extends MongoQueryBase {
    @MongoFieldResolver("findById", Customer)
    public findById: (id: number) => Promise<Customer>;

    @MongoFieldResolver("count", GraphQLInt)
    public count: () => Promise<number>;

    @MongoFieldResolver("findOne", Customer)
    public findOne: (input: any) => Promise<Customer>;

    @MongoFieldResolver("findMany", [Customer])
    public findMany: (input: any) => Promise<Customer[]>;

}
