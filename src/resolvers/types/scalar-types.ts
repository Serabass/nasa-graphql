import {GraphQLScalarType, Kind} from "graphql";

export const CustomScalar = new GraphQLScalarType({
    name: "CustomScalar",
    description: "CustomScalar",

    parseValue(value: string): string {
        return value.split("").reverse().join("");
    },

    serialize(value: string) {
        return value.split("").reverse().join("");
    },

    parseLiteral(ast): string | null {
        if (ast.kind === Kind.STRING) {
            return ast.value.split("").reverse().join("");
        }
        return null;
    },
});
