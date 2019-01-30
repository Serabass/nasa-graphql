import * as dotenv from "dotenv";
import "reflect-metadata";
import {Container} from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";
import createServer from "./createServer";
import bootstrapDatabase from "./db";
import mongoConnect from "./mongo";
import { createConnection, Connection } from "typeorm";

dotenv.config();

TypeGraphQL.useContainer(Container);
TypeORM.useContainer(Container);

async function bootstrap() {
    // const db = await bootstrapDatabase();
    await mongoConnect();

    const connection: Connection = await createConnection({
        type: "mongodb",
        host: "localhost",
        port: 27017,
        database: "test",
        useNewUrlParser: true
    });
    const server = await createServer(connection);
    await server.start({}, (deets) => {
        console.log(`Server is now running on port http://localhost:${deets.port}`);
    });
}

bootstrap();
