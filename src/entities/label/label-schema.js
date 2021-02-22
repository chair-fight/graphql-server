const { gql } = require('apollo-server');


const labelTypeDefs = gql`
    extend type Query{
        getLabelsOfUser(uid : ID!) : [Label]!
    }

    extend type Mutation{
        addLabelToUser(name : String!, color : Int!, uid : ID!) : Boolean
    }

    type Label{
        name : String!
        color : String!
    }
`
module.exports = labelTypeDefs