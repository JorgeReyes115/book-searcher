const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    username: string
    email: string
    bookCount: Int
    savedBooks: [book]
}

type Auth {
    token: ID!
    user: User
}

type book {
    bookId ID!
    authors: [String]
    title: String!
    description: String!
    image: String
    link: String
}

input BookInput {
    bookId ID!
    authors: [String]
    title: String!
    description: String!
    image: String
    link: String
}

type Query {
    me: User
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String): Auth
    saveBook(BookData: BookInput!): User
    removeBook(bookId:ID!): User
}












`