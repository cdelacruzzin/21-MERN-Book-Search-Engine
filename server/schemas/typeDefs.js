const {gql} = require('apollo-server-express');

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
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    #removeBook(Book: bookId!): User


    #still need to save a book
}

`
module.exports = typeDefs;