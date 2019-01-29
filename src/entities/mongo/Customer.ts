import {buildSchema, field, indexed, schema, unique, virtuals} from "mongoose-schema-decorators";
import {Document, model, Model, Mongoose, Schema} from "mongoose";

@schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
})
class Customer {
    @indexed
    @unique
    public _id: number;

    @field
    @indexed
    @unique
    public name: string;

    @field(Date)
    public createdDate: Date;

    get getRef(): string {
        return `${this._id}-${this.name}`;
    }
}

const CustomerSchema: Schema = buildSchema(Customer);
type CustomerDocument = Customer & Document;
export const CustomerModel = model<CustomerDocument, Model<CustomerDocument>>("Customer", CustomerSchema);
