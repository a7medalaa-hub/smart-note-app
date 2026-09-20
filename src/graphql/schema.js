const {
    buildSchema
} = require("graphql");

const schema = buildSchema(`
    type User {
        id: ID!
        email: String!
        profilePicture: String
    }

    type Note {
        id: ID!
        title: String!
        content: String!
        ownerId: ID!
        owner: User
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        notes(
            userId: ID
            title: String
            createdFrom: String
            createdTo: String
            page: Int
            limit: Int
        ): [Note!]!
    }
`);

module.exports = schema;