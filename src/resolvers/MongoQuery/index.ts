import {Arg, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {CustomerModel} from "../../entities/mongo/Customer";
import MongoResolver, {MongoField} from "../../decorators/mongo-resolver";

@ObjectType()
@Resolver(() => MongoQuery)
@MongoResolver(CustomerModel)
export class MongoQuery {

    private model = CustomerModel;

    constructor() {
    }

    @FieldResolver(() => Number)
    // @MongoField("findById")
    public findById(@Arg("id") id: number) {
        return 123;
    }
}
