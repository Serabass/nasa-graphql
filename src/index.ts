import * as dotenv from "dotenv";
import "reflect-metadata";
import {Container} from "typedi";
import * as TypeGraphQL from "type-graphql";
import createServer from "./createServer";

dotenv.config();

TypeGraphQL.useContainer(Container);

async function bootstrap() {

    const server = await createServer();
    await server.start({}, (deets) => {
        console.log(`Server is now running on port http://localhost:${deets.port}`);
    });
}

bootstrap();
