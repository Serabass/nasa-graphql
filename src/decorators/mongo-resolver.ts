import {composeWithMongoose} from "graphql-compose-mongoose";
import "reflect-metadata";
import {FieldResolver} from "type-graphql";
import {getMetadataStorage} from "type-graphql/metadata/getMetadataStorage";

const METADATA_KEY = "mongo:fields";
export default function MongoResolver(model) {
    let mongooseTypeComposer = composeWithMongoose(model);

    return (target: any) => {
        let fields = Reflect.getMetadata(METADATA_KEY, target.prototype);
        let fields2 = Reflect.getMetadata(METADATA_KEY, target.prototype.constructor);
        let baseClass = Object.getPrototypeOf(target);

        if (!fields) {
            fields = {};
        }

        Object.keys(fields).forEach((key) => {
            let md = Reflect.getMetadataKeys(target, key);
            let wmd = Reflect.getOwnMetadataKeys(target, key);
            let md2 = Reflect.getMetadataKeys(target.prototype, key);
            let wmd2 = Reflect.getOwnMetadataKeys(target.prototype, key);
            let wmd12 = Reflect.getMetadata("design:type", target.prototype, key);

            let x: any = getMetadataStorage();
            let aa = x.resolverClasses.find((aaa) => aaa.target === target);
            let field = fields[key];
            target.prototype[key] = (args: any, ctx: any) => {
                debugger;
                return;/*mongooseTypeComposer.getResolver(field.name).resolve({
                    args,
                });*/
            };

            // Reflect.defineMetadata("design:paramtypes", [Object, Object], target.prototype, key);
            // Args(() => Number)(target.prototype, key, 0);
            // Ctx()(target.prototype, key, 1);
            FieldResolver(() => field.type)(target.prototype, field.name, {});
            let a = mongooseTypeComposer.getResolver(field.name);
            let xxx = Reflect.getMetadata("design:paramtypes", target.prototype, key);
        });
    };
}

export function MongoFieldResolver(name: string, type: any) {
    return (target: any, propertyKey: string) => {
        let metaData = Reflect.getMetadata(METADATA_KEY, target);

        if (!metaData) {
            metaData = {};
        }

        metaData[propertyKey] = {
            name, type,
        };

        Reflect.defineMetadata(METADATA_KEY, metaData, target);
    };
}
