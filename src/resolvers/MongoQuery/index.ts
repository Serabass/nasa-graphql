import {Ctx, FieldResolver, ObjectType, Resolver} from "type-graphql";
import {CustomerModel} from "../../entities/mongo/Customer";
import MongoResolver from "../../decorators/mongo-resolver";
import {CustomerQuery} from "./CustomerQuery";
import {Context} from "../../context";
import {GraphQLJSON} from "graphql-compose";

@ObjectType()
@MongoResolver(CustomerModel)
export class MongoQuery {
    constructor() {
    }

    @FieldResolver(() => CustomerQuery)
    public async Customer(@Ctx() ctx: Context): Promise<any> {
        return {};
    }
}
