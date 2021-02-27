const { gql } = require('apollo-server');



const scheduleEntryGroupTypeDefs = gql`
    extend type Query {
        getScheduleEntryGroupForScheduleGroup(spid : ID!) : [ScheduleEntryGroup]!
    }

    extend type Mutation{
        addScheduleEntryGroup(name:String!,weekDay: Int!,startTime : Int!, duration : Int!, sgid : ID!) : Boolean!
        addLabelToScheduleEntryGroup(segid : ID!,lgid : ID!) : Boolean
    }

    type ScheduleEntryGroup{
        segid : ID!
        name : String!
        weekDay : Int!
        startTime : Int!
        duration : Int! 
        sgid : ID!
        label : Label
    }

`
module.exports = scheduleEntryGroupTypeDefs;