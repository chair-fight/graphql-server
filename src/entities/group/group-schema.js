const { gql } = require('apollo-server');


const groupTypeDefs = gql`
    extend type Query{
        getGroup(groupID : ID!) : Group
        getAllGroups : [Group]
    }

    extend type Mutation{
        createGroup(adminUID : ID!,groupName : String): Boolean
        updateGroup(groupID : ID!,newName : String,newDescription : String) : Group!
        addUser(groupID : ID!,uid:ID!) : Boolean
    }

    type Group{
        gid : ID!
        name : String!
        description : String
        groupAssignments : [AssignmentGroupForGroup]!
        numberOfMembers : Int!
        adminUsers : [User!]!
        users : [User]!
        uid : Int!
        owner : User!
    }
`
module.exports = groupTypeDefs;