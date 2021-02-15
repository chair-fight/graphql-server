


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
        }
    }
}