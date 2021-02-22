const { gql } = require('apollo-server');



const assignmentPrivateTypeDefs = gql`
    extend type Query {
        getAssignmentsPrivateForUser(uid : ID!) : [AssignmentPrivate]!
    }

    extend type Mutation{
        addAssignmentPrivate(uid : ID!,name:String!,dueDate: String!) : ID!
    }

    type AssignmentPrivate{
        apid : ID!
        name : String!
        isFinished : Boolean!
        dueDate : String!
    }
    
`
module.exports = assignmentPrivateTypeDefs;