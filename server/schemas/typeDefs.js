const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    _id: ID
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    singleUser(userId: ID!): User
}

input BookInput {
    authors: [String!]!
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
}
input userInput{
    _id: ID
    username: String!
}


type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    removeBook(bookId: String!, userId: ID!): User

    saveBook(bookDetails: BookInput!, user: userInput!): User
}

`
module.exports = typeDefs;