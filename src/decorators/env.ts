export default function EnvValue(name?: string): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        Object.defineProperty(target, propertyKey, {
            value: process.env[name || propertyKey as string],
        });
    };
}
