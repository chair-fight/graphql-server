


module.exports = {
    Query : {
        getGroup: async (_,{groupID},{dataSources}) =>{
            console.log(groupID)
            return dataSources.groupDatabaseData.getGroup(groupID);

        },
        getAllGroups: async (_ , __, { dataSources }) => {
            return dataSources.groupDatabaseData.getAllGroups();
        },
    },
    Mutation :{
        createGroup : async (_,{adminUID,groupName},{dataSources}) =>{
            return await dataSources.groupDatabaseData.createGroup(adminUID,groupName);
        },
        updateGroup : async (_,{groupID,newName,newDescription},{dataSources}) =>{
            return  dataSources.groupDatabaseData.updateGroup(groupID,newName,newDescription);
        },
        addUser : async (_,{groupID,uid},{dataSources}) =>{
            return await dataSources.groupDatabaseData.addUserToGroup(groupID,uid);
        },
    },
    Group : {
        numberOfMembers: async (group,__,{dataSources}) => {
            return dataSources.groupDatabaseData.getNumberOfMembersOfGroup(group.gid);
        },
        owner: async (group,__,{dataSources}) => {
            return dataSources.userDatabaseData.getUserWithUID(group.uid);
        },
        adminUsers: async (group,__,{dataSources}) => {
            return dataSources.groupDatabaseData.getGroupAdmins(group.gid);
        },
        users: async (group,__,{dataSources}) => {
            return dataSources.groupDatabaseData.getGroupUsers(group.gid);
        },
        assignmentsGroup: async (group,__,{dataSources}) => {
            return dataSources.assignmentsDatabaseData.getAssignmentsGroupForGroup(group.gid);
        },
        scheduleGroup : async (group,__,{dataSources}) => {
            return dataSources.scheduleDatabaseData.getScheduleGroupOfGroup(group.gid);
        },
        labels : async (group,__,{dataSources}) => {
            return dataSources.groupDatabaseData.getLabelsOfGroup(group.gid);
        },
    }
}