const { gql } = require('apollo-server');


const groupTypeDefs = gql`
    extend type Query{
        getGroup(groupID : ID!) : Group
        getAllGroups : [Group]
    }

    extend type Mutation{
        createGroup(AdminUserID : ID!,GroupName : String): Group
        updateGroup(GroupID : ID!,NewName : String) : Boolean
        deleteGroup(GroupID : ID!) : Boolean
        removeUser(GroupID : ID!, UserID : ID!) : Boolean
        addUser(GroupID : ID!,UserID:ID!) : Boolean
    }

    type Group{
        gid : ID!
        name : String!
        description : String
        numberOfMembers : Int!
        adminUsers : [User!]!
        users : [User]!
        uid : Int!
        owner : User!
    }
`
module.exports = groupTypeDefs;