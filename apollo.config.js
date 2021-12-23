module.exports = {
  client: {
    service: {
      name: "Load GQL schema",
      url: "http://192.168.50.200:4000/graphql",
      includes: ["./queries/**/*.ts"], // array of glob patterns
      tagName: "gql",
      globalTypesFile: "./types/graphql-global-types.ts",
      addTypename: true,
      skipSSLValidation: true,
    },
  },
};
