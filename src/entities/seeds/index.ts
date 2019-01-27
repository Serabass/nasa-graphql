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
        }

        await em.query('UPDATE cart_item set productId = (SELECT id from product ORDER BY RAND() LIMIT 1)');
        await em.query('UPDATE cart_item set cartId = (SELECT id from cart ORDER BY RAND() LIMIT 1)');
        await em.query('UPDATE `order` set userId = (SELECT id from user ORDER BY RAND() LIMIT 1)');
        await em.query('UPDATE `product` set categoryId = (SELECT id from product_category ORDER BY RAND() LIMIT 1)');
        // await em.query('UPDATE `product_category` set parentId = (SELECT id from product_category ORDER BY RAND() LIMIT 1)');
        await em.query('UPDATE `product_comment` set userId = (SELECT id from user ORDER BY RAND() LIMIT 1)');
        await em.query('UPDATE `product_comment` set productId = (SELECT id from product ORDER BY RAND() LIMIT 1)');
    }

    process.exit();
})();
