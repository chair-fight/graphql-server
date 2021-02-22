


module.exports = {
    Query : {
        getAssignmentsGroupForUser : async (_, {uid}, {dataSources}) => {
            return dataSources.assignmentsDatabaseData.getAssignmentsGroupForUser(uid);
        },
        getAssignmentsGroupForGroup : async (_, {gid}, {dataSources}) => {
            return dataSources.assignmentsDatabaseData.getAssignmentsGroupForGroup(gid);
        },
    },
    Mutation : {
        addAssignmentGroup : async (_,{gid,name,dueDate},{dataSources}) => {
            return dataSources.assignmentsDatabaseData.addAssignmentGroup(gid,name,dueDate);
        },
    }
}