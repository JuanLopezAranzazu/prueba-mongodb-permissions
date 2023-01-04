const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    token: String
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User
  }

  type Query {
    findAllUsers: [User!]!
    findByIdUser(id: ID!): User!
    userAuthenticated: User!
    findAllMessages: [Message!]!
    findByIdMessage: Message!
  }

  input RegisterUserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    username: String!
    password: String!
  }

  input CreateMessageInput {
    text: String!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): User!
    loginUser(input: LoginUserInput!): User!
    deleteUser(id: ID!): User!
    createMessage(input: CreateMessageInput!): Message!
    deleteMessage(id: ID!): Message!
  }
`;

module.exports = { typeDefs };
