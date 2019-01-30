import {MongoFieldResolver} from "../../decorators/mongo-resolver";
import {Customer} from "../../entities/mongo/Customer";
import {GraphQLInt} from "graphql";

export class MongoQueryBase {
    constructor() {
    }

    @MongoFieldResolver("findById", Customer)
    public findById: (id: number) => Promise<Customer>;

    @MongoFieldResolver("count", GraphQLInt)
    public count: () => Promise<number>;

    @MongoFieldResolver("findOne", Customer)
    public findOne: (input: any) => Promise<Customer>;

    @MongoFieldResolver("findMany", [Customer])
    public findMany: (input: any) => Promise<Customer[]>;

    /// ... etc
}
