const { gql } = require('apollo-server');



const scheduleEntryPrivateTypeDefs = gql`
    extend type Query {
        getScheduleEntryPrivateForSchedulePrivate(spid : ID!) : [ScheduleEntryPrivate]!
    }

    extend type Mutation{
        addScheduleEntryPrivate(name:String!,weekDay: Int!,startTime : Int!, duration : Int!, spid : ID!) : Boolean!
        addLabelToScheduleEntryPrivate(sepid : ID!,lid : ID!) : Boolean
    }

    type ScheduleEntryPrivate{
        sepid : ID!
        name : String!
        weekDay : Int!
        startTime : Int!
        duration : Int!
        spid : ID!
        lid : ID
        label : Label
    }

`
module.exports = scheduleEntryPrivateTypeDefs;