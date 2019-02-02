import "reflect-metadata";
import {AdvancedOptions, MethodAndPropDecorator, ReturnTypeFunc} from "type-graphql/decorators/types";
import {Arg, FieldResolver} from "type-graphql";
import {GraphQLJSON} from "graphql-compose";
import fetch, {RequestInit} from "node-fetch";

export type RequestType = "json" | "text" | "blob" | "buffer" | "arrayBuffer" | "textConverted";

export interface RequestInitEx extends RequestInit {
    type?: RequestType;
    url: string;
    resolve?(...args): any;
    prepare?(...args): void;
}

export function RemoteApi(
    returnTypeFuncOrOptions: ReturnTypeFunc | AdvancedOptions,
    maybeOptions: AdvancedOptions & { argType?: any },
    options: RequestInitEx,
): MethodAndPropDecorator {
    if (typeof options.type === "undefined") {
        options.type = "json";
    }

    if (typeof options.resolve === "undefined") {
        options.resolve = (response) => response;
    }

    if (typeof options.prepare === "undefined") {
        options.prepare = (args) => {
        };
    }

    return (prototype, propertyKey, descriptor?) => {
        prototype[propertyKey] = async (data) => {
            let url: string = options.url;
            url = url.replace(/:(\w+)/g, (m, name) => data[name]);
            let response = await fetch(url, options);
            let result;

            switch (options.type) {
                case "json":
                    result = response.json();
                    break;
                case "text":
                    result = response.text();
                    break;
                case "blob":
                    result = response.blob();
                    break;
                case "buffer":
                    result = response.buffer();
                    break;
                case "arrayBuffer":
                    result = response.arrayBuffer();
                    break;
                case "textConverted":
                    result = response.textConverted();
                    break;
                default:
                    throw new Error("Under Construction");
            }

            return options.resolve(result);
        };
        Reflect.defineMetadata("design:paramtypes", [maybeOptions.argType || Object], prototype, propertyKey);
        Arg("data", () => maybeOptions.argType || GraphQLJSON)(prototype, propertyKey, 1);
        FieldResolver(returnTypeFuncOrOptions as ReturnTypeFunc, maybeOptions)(prototype, propertyKey, descriptor);
    };
}
