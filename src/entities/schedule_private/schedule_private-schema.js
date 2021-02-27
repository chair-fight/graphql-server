const { gql } = require('apollo-server');


const schedulePrivateTypeDefs = gql`
    extend type Query{
        getSchedulePrivateOfUser(uid : ID!) : [SchedulePrivate]!
    }

    extend type Mutation{
        addSchedulePrivateToUser(name : String!, uid : ID!) : Boolean
    }

    type SchedulePrivate{
        spid : ID!
        name : String!
        uid : ID!
        scheduleEntries : [ScheduleEntryPrivate]!
    }
`
module.exports = schedulePrivateTypeDefs