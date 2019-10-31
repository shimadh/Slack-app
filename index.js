import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolver";
import models from "./models";

const app = express();

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
