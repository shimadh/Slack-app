import express from "express";
import { ApolloServer } from "apollo-server-express";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import path from "path";
import models from "./models";

const app = express();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schemas")));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  context: {
    models,
    user: {
      id: 1
    }
  }
});

const graphQlEndPoint = "/graphql";
const port = 9002;

server.applyMiddleware({ app, path: graphQlEndPoint });
// Additional middleware can be mounted at this point to run before Apollo.

models.sequelize.sync({}).then(() => {
  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}${graphQlEndPoint}`);
  });
});
