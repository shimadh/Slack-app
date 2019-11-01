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
  resolvers
});

const graphQlEndPoint = "/graphql";

server.applyMiddleware({ app, path: graphQlEndPoint });
// Additional middleware can be mounted at this point to run before Apollo.

models.sequelize.sync({ force: true });

app.listen({ port: 8001 }, () => {
  console.log("Apollo Server on http://localhost:8001/graphql");
});
