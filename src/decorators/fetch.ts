import "reflect-metadata";
import {Context} from "../context";
import {Args, Ctx, FieldResolver, Root} from "type-graphql";
import * as path from "path";
import URLEx from "../URLEx";

export interface FetchOptions {
    slash?: boolean;
    path: string;
    type: any;
    args?: any;
    urlArgsType?: any;
}

export function Fetch(options: FetchOptions) {
    if (typeof options.slash === "undefined") {
        options.slash = false;
    }

    return (target, propKey) => {
        target[propKey] = async (ctx: Context, root: any, args: any) => {
            if (!root.currentPath) {
                root.currentPath = [];
            }

            let currentPath = Array.of(...root.currentPath);

            options.path = options.path.replace(/:(\w+)/g, (match, argName) => args[argName]);

            currentPath.push(options.path);
            // debugger;
            let url = path.join(...currentPath).replace(/\\/g, "/");

            if (options.slash) {
                url = `${url}/`;
            }

            return URLEx.fetch(ctx, url, args);
        };
        let descriptor = Reflect.getOwnPropertyDescriptor(target, propKey);
        FieldResolver(() => options.type)(target, propKey, descriptor);
        Ctx()(target, propKey, 1);
        Root()(target, propKey, 2);

        if (options.args) {
            let paramTypes = Reflect.getMetadata("design:paramtypes", target, propKey);
            if (!paramTypes) {
                paramTypes = [];
            }

            if (paramTypes.length < 3) {
                paramTypes.length = 3;
                paramTypes[2] = options.args;
            }

            Reflect.defineMetadata("design:paramtypes", paramTypes, target, propKey);

            Args(() => options.args)(target, propKey, 3);
        }

        if (options.urlArgsType) {
            Reflect.defineMetadata("design:paramtypes", [null, null, options.urlArgsType], target, propKey);
            Args(() => options.urlArgsType)(target, propKey, 3);
        }
    };
}
