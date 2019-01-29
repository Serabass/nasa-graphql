import bootstrapDatabase from "./db";
import {Order} from "./entities/Order";

async function bootstrap() {
    const db = await bootstrapDatabase();

    let proj = await db.getRepository(Order).find({
        relations: ["user"],
    });
}

bootstrap();
