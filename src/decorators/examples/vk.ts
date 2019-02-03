import VK from "vk-io";
import "reflect-metadata";
import {ReturnTypeFunc} from "type-graphql/decorators/types";
import {Arg, FieldResolver, Info} from "type-graphql";
import {FieldResolverMetadata} from "type-graphql/metadata/definitions";
import {GraphQLResolveInfo} from "graphql";

const vk = new VK();
vk.token = "af7464f0af7464f0af7464f0a0af292906aaf74af7464f0f61e5ed74f6219296eb46b41";

export interface VKMethodOptions {
    method: string;
    params: any;
}

export default function VKAPI<T>(returnTypeFuncOrOptions, options: VKMethodOptions): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        target[propertyKey] = async (args: T, info: GraphQLResolveInfo) => {
            let [field] = info.fieldNodes;
            let names = field.selectionSet.selections.map((s: any) => s.name.value);
            (args as any).fields = names.join(",");
            let response = await vk.api.call(options.method, args);
            debugger;
            return response;
        };

        let descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey);

        Reflect.defineMetadata("design:paramtypes", [options.params], target, propertyKey);
        Arg("data", () => options.params as any)(target, propertyKey, 1);
        Info()(target, propertyKey, 2);
        FieldResolver(returnTypeFuncOrOptions as ReturnTypeFunc, {})(target, propertyKey, descriptor);
    };
}
