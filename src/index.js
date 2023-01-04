/*
const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { shield, rule } = require("graphql-shield");
const { applyMiddleware } = require("graphql-middleware");
// type defs
const { typeDefs } = require("./Schema/TypeDefs");
// resolvers
const { resolvers } = require("./Schema/Resolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers });

// const isAuthenticated = rule()(async (parent, args, ctx, info) => {
//   return false;
// });

const jwt = require("jsonwebtoken");

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const authHeader = ctx.req.get("Authorization");
  if (!authHeader) {
    throw new Error("Not authenticated");
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = await jwt.verify(token, "SECRET");
    return !!user;
  } catch (err) {
    throw new Error("Not authenticated");
  }
});

const permissions = new shield({
  Query: {
    findByIdUser: isAuthenticated,
  },
  Mutation: {},
});

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: ({ req }) => ({ req }),
});

server.listen().then(({ url }) => {
  console.log("SERVER RUNNING ON URL", url);
});
*/

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { shield, rule } = require("graphql-shield");
const { applyMiddleware } = require("graphql-middleware");
const jwt = require("jsonwebtoken");
const app = express();
require("./mongo");
// config
const { config } = require("./config");

// type defs
const { typeDefs } = require("./Schema/TypeDefs");
// resolvers
const { resolvers } = require("./Schema/Resolvers");

app.use(async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      req.user = await jwt.verify(token, "SECRET");
    } catch (error) {
      throw new Error("Jwt incorrect");
    }
  }
  next();
});

// rule
const isAuthenticated = rule()(async (parent, args, { user }, info) => {
  return !!user;
});

// shield
const permissions = new shield({
  Query: {
    userAuthenticated: isAuthenticated,
  },
  Mutation: {
    createMessage: isAuthenticated,
    deleteMessage: isAuthenticated,
  },
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: ({ req }) => ({ user: req.user }),
});

server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: config.port }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
