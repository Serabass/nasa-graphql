import "reflect-metadata";
import Faker from "faker";

export interface SeedOptions<T> {
    amount: number;
    fill?(entity: T, faker: typeof Faker): void | Promise<void>;
    after?(em): void | Promise<void>;
}

export default function Seed<T>(options: SeedOptions<T>): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata("SEED_METADATA", options, target);
        let SEED_MODELS: any[] = Reflect.getMetadata("SEED_MODELS", Seed);

        if (!SEED_MODELS) {
            SEED_MODELS = [];
        }

        SEED_MODELS.push(target);

        Reflect.defineMetadata("SEED_MODELS", SEED_MODELS, Seed);
    };
}
