/*
const JSONDATA = require("./../../MOCK_DATA.json");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    findAllUsers(parent, args, ctx, info) {
      return JSONDATA;
    },
    async findByIdUser(parent, args, ctx, info) {
      const user = await JSONDATA.find((user) => user.id == args.id);
      return user;
    },
    async userAuthenticated(parent, args, { user }, info) {
      console.log("AUTHENTICATED", user);
      const authenticated = await JSONDATA.find(
        (user_data) => user_data.id == user.userId
      );
      return authenticated;
    },
  },
  Mutation: {
    async registerUser(parent, args) {
      const registerData = args.input;
      const data = {
        id: Math.max(...JSONDATA.map((user) => user.id)) + 1,
        ...registerData,
      };
      await JSONDATA.push(data);
      const token = await jwt.sign(
        { userId: data.id, username: data.username },
        "SECRET"
      );
      return {
        ...data,
        token,
      };
    },
    async loginUser(parent, args) {
      const loginData = args.input;
      const data = await JSONDATA.find(
        (user) =>
          user.username === loginData.username &&
          user.password === loginData.password
      );
      const token = await jwt.sign(
        { userId: data.id, username: data.username },
        "SECRET"
      );
      return {
        ...data,
        token,
      };
    },
  },
};

module.exports = { resolvers };
*/

// queries
const queriesUser = require("./Resolvers/User");
const queriesMessage = require("./Resolvers/Message");
// mutations
const mutationsUser = require("./Mutations/User");
const mutationsMessage = require("./Mutations/Message");

const resolvers = {
  Query: {
    ...queriesUser,
    ...queriesMessage,
  },
  Mutation: {
    ...mutationsUser,
    ...mutationsMessage,
  },
};

module.exports = { resolvers };
