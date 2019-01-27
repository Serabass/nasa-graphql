import 'reflect-metadata';

export default function Seed(options): ClassDecorator {
    return (target: Function) => {
        Reflect.defineMetadata('SEED_METADATA', options, target);
        let SEED_MODELS: any[] = Reflect.getMetadata('SEED_MODELS', Seed);

        if (!SEED_MODELS) {
            SEED_MODELS = [];
        }

        SEED_MODELS.push(target);

        Reflect.defineMetadata('SEED_MODELS', SEED_MODELS, Seed);
    }
}
