module.exports = {
  client: {
    service: {
      name: "Load GQL schema",
      url: "http://localhost:4000/graphql",
      includes: ["./queries/**/*.ts"], // array of glob patterns
      tagName: "gql",
      globalTypesFile: "./types/graphql-global-types.ts",
      addTypename: true,
      skipSSLValidation: true,
    },
  },
};
