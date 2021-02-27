module.exports = {
    Query : {
        getScheduleEntryGroupForScheduleGroup : async (_, {sgid}, {dataSources}) => {
            return dataSources.scheduleDatabaseData.getScheduleEntryGroupForScheduleGroup(sgid);
        },
    },
    Mutation : {
        addScheduleEntryGroup : async (_,{name,weekDay,startTime,duration,sgid},{dataSources}) => {
            return dataSources.scheduleDatabaseData.addScheduleEntryGroup(name,weekDay,startTime,duration,sgid);
        },
        addLabelToScheduleEntryGroup : async (_,{segid,lgid},{dataSources}) => {
            return dataSources.scheduleDatabaseData.addLabelToScheduleEntryGroup(segid,lgid);
        },
    },
    ScheduleEntryGroup : {
        label : async (scheduleEntryGroup,__,{dataSources}) => {
             return dataSources.scheduleDatabaseData.getLabelForScheduleEntryGroup(scheduleEntryGroup.lgid)
        },
    }
}