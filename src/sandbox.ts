import * as dotenv from "dotenv";
import "reflect-metadata";
import {Container} from "typedi";
import * as TypeGraphQL from "type-graphql";
import {GraphQLServer} from "graphql-yoga";
import {ContextParameters} from "graphql-yoga/dist/types";
import {GraphQLField} from "graphql";
import {makeExecutableSchema} from "graphql-tools";

dotenv.config();

TypeGraphQL.useContainer(Container);

import {SchemaDirectiveVisitor} from "graphql-tools";
import * as fs from "fs-extra";

class FetchDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        field.isDeprecated = true;
        field.deprecationReason = this.args.reason;
    }
}

async function createServer() {
    let source = (await fs.readFile("new-schema.graphqls")).toString("utf-8");
    const schema = await makeExecutableSchema({
        typeDefs: source,
        directiveResolvers: {
            Fetch(next, src, args, context) {
                debugger;
                return next().then((str) => {
                    debugger;
                });
            },
            PassNext(next, src, args, context) {
                debugger;
                return next().then((str) => {
                    debugger;
                });
            },
        },
    });
    return new GraphQLServer({
        schema,
        context: async ({request}: ContextParameters) => {
            return {};
        },
    });
}

async function bootstrap() {
    const server = await createServer();
    await server.start({}, (deets) => {
        console.log(`Server is now running on port http://localhost:${deets.port}`);
    });
}

bootstrap();
