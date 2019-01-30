import {composeWithMongoose} from "graphql-compose-mongoose";
import "reflect-metadata";
import {GraphQLJSON} from "graphql-compose";
import {Arg, FieldResolver, Resolver} from "type-graphql";

const METADATA_KEY = "mongo:fields";
export default function MongoResolver(model) {
    let mongooseTypeComposer = composeWithMongoose(model);

    return (target: any) => {
        Resolver(() => target)(target);
        Reflect.defineMetadata("mongo:model", model, target);
    };
}

export function MongoFieldResolver(name: string, type: any) {
    return (target: any, propertyKey: string) => {

        target[propertyKey] = () => {
            debugger;
            let model = Reflect.getMetadata("mongo:model", target);
            return 123;
        };

        Reflect.defineMetadata("design:paramtypes", [Object], target, propertyKey);
        Arg("data", () => GraphQLJSON)(target, propertyKey, 1);
        FieldResolver(() => GraphQLJSON, {})(target, propertyKey, {});

        /*let metaData = Reflect.getMetadata(METADATA_KEY, target);
        debugger;

        let field = fields[propertyKey];


        if (!metaData) {
            metaData = {};
        }

        metaData[propertyKey] = {
            name, type,
        };

        Reflect.defineMetadata(METADATA_KEY, metaData, target);*/
    };
}
