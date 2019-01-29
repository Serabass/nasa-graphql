import {Arg, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {CustomerModel} from "../../entities/mongo/Customer";
import MongoResolver, {MongoField} from "../../decorators/mongo-resolver";
import {GraphQLJSON} from "graphql-compose";

@ObjectType()
@Resolver(() => MongoQuery)
@MongoResolver(CustomerModel)
export class MongoQuery {

    private model = CustomerModel;

    constructor() {
    }

    @FieldResolver(() => GraphQLJSON)
    @MongoField("findById")
    public findById(@Arg("id") id: number) {
        return this.model.findById(id);
    }
}
