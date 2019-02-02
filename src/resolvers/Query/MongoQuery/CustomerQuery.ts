import {Arg, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {Customer, CustomerModel} from "../../../entities/mongo/Customer";
import MongoResolver, {MongoFieldResolver} from "../../../decorators/mongo-resolver";
import {GraphQLInt} from "graphql";

@ObjectType()
@MongoResolver(CustomerModel)
@Resolver(() => CustomerQuery)
export class CustomerQuery {
    @FieldResolver(() => Customer)
    public async findById(@Arg("id") id: string) {
        return await CustomerModel.findById(id);
    }

    @MongoFieldResolver("count", GraphQLInt)
    public count(id: number): Promise<Customer> {
        return {} as any;
    }
    @MongoFieldResolver("findOne", Customer)
    public findOne(id: number): Promise<Customer> {
        return {} as any;
    }
    @MongoFieldResolver("findMany", [Customer])
    public findMany(id: number): Promise<Customer> {
        return {} as any;
    }
}
