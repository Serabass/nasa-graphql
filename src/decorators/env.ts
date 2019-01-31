export default class EnvValue {
    private static default(cb: (value: string) => any): PropertyDecorator;
    private static default(name: string, cb: (value: string) => any): PropertyDecorator;
    private static default(...args: any[]): PropertyDecorator {
        let name;
        let cb;

        switch (args.length) {
            case 1:
                let [arg] = args;

                switch (typeof arg) {
                    case "function":
                        cb = arg;
                        break;
                    case "string":
                        cb = (value: string) => value;
                        break;
                }

                break;
            case 2:
                [name, cb] = args;
                break;
        }

        return (target: any, propertyKey: string | symbol) => {
            let value = cb(process.env[(name || propertyKey) as string]);
            Object.defineProperty(target, propertyKey, {
                value,
                writable: false,
                enumerable: true,
            });
        };
    }

    public static string = (name?: string) => EnvValue.default(name, (value: string) => value);
    public static boolean = (name?: string) => EnvValue.default(name, (value: string) => value === "true");
    public static number = (name?: string) => EnvValue.default(name, (value: string) => parseFloat(value));
}
