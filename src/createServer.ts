import {GraphQLServer} from "graphql-yoga";
import {buildSchema} from "type-graphql";
import {ContextParameters} from "graphql-yoga/dist/types";

async function createServer() {
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.ts"],
        emitSchemaFile: true,
    });
    return new GraphQLServer({
        schema,
        context: async ({request}: ContextParameters) => {
            return {};
        },
    });
}

export default createServer;
