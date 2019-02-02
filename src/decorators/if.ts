
export default function If(condition: () => boolean, decorator: any) {
    return (target: any, propertyKey: any) => {
        if (condition()) {
            return decorator(target, propertyKey);
        }
    };
}
