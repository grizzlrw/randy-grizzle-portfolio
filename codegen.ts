
import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:3000/graphql",
//   documents: "app/**/*.tsx",
//   generates: {
//     "/gql": {
//       preset: "client",
//       plugins: []
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"]
//     }
//   }
// };

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: [
    "graphql/queries/**/*.graphql",
    "graphql/mutations/**/*.graphql",
    "graphql/posts/**/*.graphql",
  ],
  generates: {
    "./generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
