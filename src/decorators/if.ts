export default function If(condition: () => boolean) {
    return (decorator: any) =>
        (target: any, propertyKey: any) => {
            if (condition()) {
                return decorator(target, propertyKey);
            }
        };
}
