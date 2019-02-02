import {buildSchema, field, indexed, schema, unique, virtuals} from "mongoose-schema-decorators";
import {Document, model, Model, Schema} from "mongoose";
import {Field, ObjectType} from "type-graphql";

@schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
})
@ObjectType()
export class Customer {
    @Field({nullable: true})
    public _id: number;

    @field
    @indexed
    @unique
    @Field({nullable: true})
    public name: string;

    @field(Date)
    @Field({nullable: true})
    public createdDate: Date;

    @Field({nullable: true})
    get getRef(): string {
        return `${this._id}-${this.name}`;
    }
}

const CustomerSchema: Schema = buildSchema(Customer);
type CustomerDocument = Customer & Document;
export const CustomerModel = model<CustomerDocument, Model<CustomerDocument>>("Customer", CustomerSchema);
