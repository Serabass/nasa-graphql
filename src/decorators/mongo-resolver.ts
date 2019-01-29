import {composeWithMongoose} from "graphql-compose-mongoose";
import "reflect-metadata";

const METADATA_KEY = "mongo:fields";
export default function MongoResolver(model) {
    let mongooseTypeComposer = composeWithMongoose(model);
    return (target: any) => {
        let fields = Reflect.getMetadata(METADATA_KEY, target.prototype);

        let md = Reflect.getMetadataKeys(target);
        let wmd = Reflect.getOwnMetadataKeys(target);

        let md2 = Reflect.getMetadataKeys(target.prototype);
        let wmd2 = Reflect.getOwnMetadataKeys(target.prototype);

        Object.keys(fields).forEach((key) => {
            let field = fields[key];
            debugger;
            target.prototype[field] = function () {
                debugger;
            };
            debugger;
        });
    };
}

export function MongoField(name?: string) {
    return (target: any, propertyKey: string) => {
        let metaData = Reflect.getMetadata(METADATA_KEY, target);

        if (!metaData) {
            metaData = {};
        }

        metaData[propertyKey] = name;

        Reflect.defineMetadata(METADATA_KEY, metaData, target);
    };
}
