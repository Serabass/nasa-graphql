import "reflect-metadata";
import {AdvancedOptions, MethodAndPropDecorator, ReturnTypeFunc} from "type-graphql/decorators/types";
import {Arg, FieldResolver} from "type-graphql";
import {GraphQLJSON} from "graphql-compose";
import fetch from "node-fetch";

export function RemoteApi(
    returnTypeFuncOrOptions: ReturnTypeFunc | AdvancedOptions,
    maybeOptions: AdvancedOptions & { argType?: any },
    options: any,
): MethodAndPropDecorator {
    if (typeof options.type === "undefined") {
        options.type = "json";
    }

    return (prototype, propertyKey, descriptor?) => {
        prototype[propertyKey] = async (args) => {
            let url: string = options.url;
            url = url.replace(/:(\w+)/, (m, name) => args[name]);
            let response = await fetch(url, options);

            switch (options.type) {
                case "json":
                    return response.json();
            }
        };
        Reflect.defineMetadata("design:paramtypes", [maybeOptions.argType || Object], prototype, propertyKey);
        Arg("data", () => maybeOptions.argType || GraphQLJSON)(prototype, propertyKey, 1);
        FieldResolver(returnTypeFuncOrOptions as ReturnTypeFunc, maybeOptions)(prototype, propertyKey, descriptor);
    };
}
