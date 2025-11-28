
import { GraphQLScalarType } from "graphql";

export const DateTimeScalar = new GraphQLScalarType({
    name: 'DateTime',
    description: 'ISO 8601 DateTime',
    serialize: (value) => {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value;
    },
    parseValue: (value) => {
        if (typeof value === 'string') {
            return new Date(value);
        }
        return value;
    },
    parseLiteral: (ast) => {
        if (ast.kind === 'StringValue') {
            return new Date(ast.value);
        }
        return null;
    },
});