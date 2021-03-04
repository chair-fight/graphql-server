const { gql } = require('apollo-server');



const userTypeDefs = gql`
    extend type Query {
        getUser( uid:ID!) : User
        getUserWithFID(fid : String!) : User
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
        dateOfCreation : String!
        assignmentsGroup : [AssignmentGroupForUser]!
        assignmentsPrivate : [AssignmentPrivate]!
        schedulePrivate : [SchedulePrivate]!
        scheduleGroup : [ScheduleGroup]!
        labels : [Label]!
        groups : [Group]
    }
`
module.exports = userTypeDefs;