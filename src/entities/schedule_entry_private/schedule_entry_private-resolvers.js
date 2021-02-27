


module.exports = {
    Query : {
        getScheduleEntryPrivateForSchedulePrivate : async (_, {spid}, {dataSources}) => {
            return dataSources.scheduleDatabaseData.getScheduleEntryPrivateForSchedulePrivate(spid);
        },
    },
    Mutation : {
        addScheduleEntryPrivate : async (_,{name,weekDay,startTime,duration,spid},{dataSources}) => {
            return dataSources.scheduleDatabaseData.addScheduleEntryPrivate(name,weekDay,startTime,duration,spid);
        },
        addLabelToScheduleEntryPrivate : async (_,{lid,sepid},{dataSources}) => {
            return dataSources.scheduleDatabaseData.addLabelToScheduleEntryPrivate(lid,sepid);
        },
    },
    ScheduleEntryPrivate : {
        label : async (scheduleEntryPrivate,__,{dataSources}) => {
            console.log(scheduleEntryPrivate);
            return dataSources.scheduleDatabaseData.getLabelForScheduleEntryPrivate(scheduleEntryPrivate.lid)
        },
    }
}