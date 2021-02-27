
const lod = require('lodash');

module.exports = {
    Query : {
        getScheduleGroupOfGroup: async (_, {gid}, {dataSources}) => {
            return dataSources.scheduleDatabaseData.getScheduleGroupOfGroup(gid);
        },
        getScheduleGroupOfUser: async (_, {uid}, {dataSources}) => {
            return dataSources.scheduleDatabaseData.getScheduleGroupOfUser(uid);
        }
    },
    Mutation : {
        addScheduleGroupToGroup : async (_,{name,gid},{dataSources}) => {
            return dataSources.scheduleDatabaseData.addScheduleGroupToGroup(name, gid);
        },
        addScheduleGroupToUser : async (_,{sgid,uid},{dataSources}) => {
            return dataSources.scheduleDatabaseData.addScheduleGroupToUser(sgid,uid);
        }
    },
    ScheduleGroup : {
        scheduleEntries :  async (scheduleGroup, __ , {dataSources}) => {
            return dataSources.scheduleDatabaseData.getScheduleEntryGroupForScheduleGroup(scheduleGroup.sgid);
        }
    }
}