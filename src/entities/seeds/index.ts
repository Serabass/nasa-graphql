import {define, factory} from "typeorm-seeding";
import Faker from "faker";
import bootstrapDatabase from "../../db";
import 'reflect-metadata';
import Seed from "../../decorators/seed";

(async function () {
    let con = await bootstrapDatabase();
    const em = con.createEntityManager();
    let SEED_MODELS = Reflect.getMetadata('SEED_MODELS', Seed);

    for (let model of SEED_MODELS) {
        let SEED_METADATA = Reflect.getMetadata('SEED_METADATA', model);

        define(model, (faker: typeof Faker, settings: { roles: string[] }) => {
            const entity = new model();
            SEED_METADATA.fill(entity, faker);
            return entity;
        });

        // con.isConnected
        let users = (await factory(model)().makeMany(SEED_METADATA.amount));
        for (let user of users) {
            await em.save(user);
            SEED_METADATA.after && await SEED_METADATA.after(em);
        }

    }

    process.exit();
})();
