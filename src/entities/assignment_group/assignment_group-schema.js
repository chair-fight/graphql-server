const { gql } = require('apollo-server');



const assignmentGroupTypeDefs = gql`
    extend type Query {
        getAssignmentsGroupForUser(uid : ID!) : [AssignmentGroupForUser]!
        getAssignmentsGroupForGroup(gid : ID!) : [AssignmentGroupForGroup]!
    }

    extend type Mutation{
        addAssignmentGroup(gid : ID!,name:String!,dueDate: String!) : ID!
    }

    type AssignmentGroupForUser{
        isFinished : Boolean!
        needHelp : Boolean!
        agid : ID!
        gid : ID!
        name : String!
        dueDate : String!
    }
    
    type AssignmentGroupForGroup {
        agid : ID!
        gid : ID!
        name : String!
        dueDate : String!
        
    }
`
module.exports = assignmentGroupTypeDefs;