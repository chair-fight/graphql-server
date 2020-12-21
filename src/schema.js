const { gql } = require('apollo-server');


const typeDefs = gql`
    type Query{
        getUser(ID:ID!) : User
        getAllUsers : [User]
        getAllGroups : [Group]
    }
    
    type Mutation{
        createUser(ID:ID!,Name: String,Password : String) : User
        updateUser(ID:ID!,NewName : String, NewSurname : String,NewUniversity : String) : User
        deleteUser(ID:ID!) : Boolean
        
        createGroup(AdminUserID : ID!,GroupName : String): Group
        updateGroup(GroupID : ID!,NewName : String) : Boolean
        deleteGroup(GroupID : ID!) : Boolean
        removeUser(GroupID : ID!, UserID : ID!) : Boolean
        addUser(GroupID : ID!,UserID:ID!) : Boolean
    }
    
    
    type User {
        ID : ID!
        Name : String!
        Email: String
        Surname : String
        University : String
        Gender: String
        DateOfBirth : String
    }
    
    type Group{
        ID : ID!
        Name : String!
        Description : String
        NumberOfMembers : Int!
        AdminUsers : [User!]!
        Users : [User]!
    }
    
    type Post{
        ID : ID!
        Author : User!
        Text : String
        Image : String
    }
    
    type Assignment { 
        ID : ID!
        Deadline : String
    }
    
    type GroupAssignment { 
        ID : ID!
        Group : Group!
        Text : String
        Deadline : String
    }
`
module.exports = typeDefs;