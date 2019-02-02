import {DescriptionOptions} from "type-graphql/decorators/types";
import {getNameDecoratorParams} from "type-graphql/helpers/decorators";
import {getMetadataStorage} from "type-graphql/metadata/getMetadataStorage";

export function ScalarType(options?: DescriptionOptions): ClassDecorator;
export function ScalarType(name: string, options?: DescriptionOptions): ClassDecorator;
export function ScalarType(
    nameOrOptions?: string | DescriptionOptions,
    maybeOptions?: DescriptionOptions,
): ClassDecorator {
    debugger;
    const {name, options} = getNameDecoratorParams(nameOrOptions, maybeOptions);
    return (target) => {
        getMetadataStorage().collectObjectMetadata({
            name: name || target.name,
            target,
            description: options.description,
        });
    };
}
