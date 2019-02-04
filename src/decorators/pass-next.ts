import "reflect-metadata";
import {Context} from "../context";
import {Arg, Args, Ctx, FieldResolver, Root} from "type-graphql";
import * as path from "path";

export interface PassNextOptions {
    type: any;
    path: string;
    urlArgsType?: any;
}

export function PassNext(options: PassNextOptions): PropertyDecorator {
    return (target: any, propKey: string) => {
        let p = Reflect.getMetadata("path", options.type) || "";
        let fullPath = path.join(p, options.path).replace(/\\/g, "/");
        Reflect.defineMetadata("path", fullPath, target);
        target[propKey] = (ctx: Context, root: any, args: any) => {
            if (!root.currentPath) {
                root.currentPath = [];
            }

            options.path = options.path.replace(/:(\w+)/g, (match, argName) => args[argName]);

            root.currentPath.push(options.path);
            let currentPath = Array.of(...root.currentPath);
            return {
                currentPath,
            };
        };

        let descriptor = Reflect.getOwnPropertyDescriptor(target, propKey);
        FieldResolver((type) => options.type, {
            description: fullPath,
        })(target, propKey, descriptor);
        Ctx()(target, propKey, 1);
        Root()(target, propKey, 2);

        if (options.urlArgsType) {
            Reflect.defineMetadata("design:paramtypes", [null, null, options.urlArgsType], target, propKey);
            Args(() => options.urlArgsType)(target, propKey, 3);
        }
    };
}
