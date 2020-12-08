const { gql } = require('apollo-server');







const typeDefs = gql`
    type Query{
        
       getUser(ID:ID!) : User
        
        
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
        Password: String!
        Surname : String
        University : String
        Groups : [Group]!
        Posts: [Post]!
    }
    
    type Group{
        ID : ID!
        Name : String!
        NumberOfMembers : Int!
        AdminUsers : [User!]!
        Users : [User]!
    }
    
    type Post{
        Author : User!
        Text : String
        Image : String
    }
    
    type Assignment { 
        ID : ID!
        Deadline : String
    }
    
    type GroupAssignment { 
        Group : Group!
        Text : String
        Deadline : String
    }
    
`
module.exports = typeDefs;