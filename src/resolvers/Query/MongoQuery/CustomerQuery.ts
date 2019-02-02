import {Arg, Args, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {Customer, CustomerModel} from "../../../entities/mongo/Customer";
import MongoResolver from "../../../decorators/mongo-resolver";
import {GraphQLInt} from "graphql";
import MongoQueryBase from "./MongoQueryBase";

@ObjectType()
@MongoResolver(CustomerModel)
@Resolver(() => CustomerQuery)
export class CustomerQuery extends MongoQueryBase<any, any> {
    constructor() {
        super(CustomerModel);
    }

    @FieldResolver(() => Customer)
    public async findById(@Arg("id") id: string): Promise<Customer> {
        return super.findById(id);
    }

    @FieldResolver(() => GraphQLInt, {})
    public count(@Args() conditions: any = {}): Promise<number> {
        return super.count(conditions);
    }

    @FieldResolver(() => Customer, {})
    public findOne(@Args() conditions: any = {}): Promise<Customer> {
        return super.findOne(conditions);
    }

    @FieldResolver(() => [Customer], {})
    public findMany(@Args() conditions: any = {}): Promise<Customer[]> {
        return super.findMany(conditions);
    }
}
