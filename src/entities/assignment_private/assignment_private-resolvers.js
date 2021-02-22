


module.exports = {
    Query : {
        getAssignmentsPrivateForUser : async (_, {uid}, {dataSources}) => {
            return dataSources.assignmentsDatabaseData.getAssignmentsPrivateForUser(uid);
        },
    },
    Mutation : {
        addAssignmentPrivate : async (_,{uid,name,dueDate},{dataSources}) => {
            return dataSources.assignmentsDatabaseData.addAssignmentPrivate(uid,name,dueDate);
        },
    }
}