const { gql } = require('apollo-server');


const scheduleGroupTypeDefs = gql`
    extend type Query{
        getScheduleGroupOfGroup(gid : ID!) : [ScheduleGroup]!
        getScheduleGroupOfUser(uid : ID!) : [ScheduleGroup]!

    }

    extend type Mutation{
        addScheduleGroupToGroup(name : String!, gid : ID!) : Boolean
        addScheduleGroupToUser(sgid : ID!, uid : ID!) : Boolean
    }

    type ScheduleGroup{
        sgid : ID!
        name : String!
        gid : ID!
        scheduleEntries : [ScheduleEntryGroup]!
    }
`
module.exports = scheduleGroupTypeDefs