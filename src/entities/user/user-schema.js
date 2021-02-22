const { gql } = require('apollo-server');



const userTypeDefs = gql`
    extend type Query {
        getUser( uid:ID!) : User
        getAllUsers : [User]
    }

    extend type Mutation{
        createUser(firebaseID:String!,email: String!) : Boolean
        updateUser(uid:ID!,newName : String, newSurname : String) : User
        deleteUser(uid:ID!) : Boolean
    }
    
    type User {
        uid : ID!
        firebaseid: String!
        name : String
        email: String!
        surname : String
        dateofcreation : String!
        assignmentsGroup : [AssignmentGroupForUser]!
        assignmentPrivate : [AssignmentPrivate]!
        schedulePrivate : [SchedulePrivate]!
        labels : [Label]!
        groups : [Group]
    }
`
module.exports = userTypeDefs;