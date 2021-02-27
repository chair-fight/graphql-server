const { gql } = require('apollo-server');


const labelTypeDefs = gql`
    extend type Query{
        getLabelsOfUser(uid : ID!) : [Label]!
        getLabelsOfGroup(gid : ID!): [Label]!
    }

    extend type Mutation{
        addLabelToUser(name : String!, color : Int!, uid : ID!) : Boolean
        addLabelToGroup(name : String!, color : Int!, gid : ID!) : Boolean
    }

    type Label{
        lid : ID!
        name : String!
        color : String!
    }
`
module.exports = labelTypeDefs