import {getMetadataStorage} from "type-graphql/metadata/getMetadataStorage";

export default function If(cb: () => boolean): any {
    return (target) => {
        let storage = getMetadataStorage();
        (storage as any).resolverClasses = (storage as any).resolverClasses.filter((a) => a.target !== target);
    };
}
