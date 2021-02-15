const { gql } = require('apollo-server');



const userTypeDefs = gql`
    extend type Query {
        getUser( firebaseid:ID!) : User
        getAllUsers : [User]
    }

    extend type Mutation{
        createUser(firebaseid:ID!,email: String!) : User
        updateUser(firebaseid:ID!,newName : String, newSurname : String) : User
        deleteUser(firebaseid:ID!) : Boolean
    }
    
    type User {
        uid : ID!
        firebaseid: String!
        name : String
        email: String!
        surname : String
        dateofcreation : String!
        groups : [Group]
    }
`
module.exports = userTypeDefs;