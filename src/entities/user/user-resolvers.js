
const lod = require('lodash');

module.exports = {
    Query : {
        getUser: async (_, {uid}, {dataSources}) => {
            return dataSources.userDatabaseData.getUserWithUID(uid);
        },
        getUserWithFID: async (_, {fid}, {dataSources}) => {
            return dataSources.userDatabaseData.getUserWithFID(fid);
        },
        getAllUsers: async (_, __, {dataSources,scope}) => {
            console.log(scope)
            return dataSources.userDatabaseData.getAllUsers();
        },
    },
    Mutation : {
        createUser : async (_,{firebaseID,email},{dataSources}) => {
            return dataSources.userDatabaseData.createUser(firebaseID,email);
        },
        updateUser : async (_,{uid,newName,newSurname},{dataSources}) => {
            return dataSources.userDatabaseData.updateUser(uid,newName,newSurname);
        },
        deleteUser : async (_,{uid},{dataSources}) => {
            return !!dataSources.userDatabaseData.deleteUser(uid);
        }
    },
    User : {
        groups : async (user,__,{dataSources}) => {
            return dataSources.userDatabaseData.getUserGroups(user.uid);
        },
        labels: async (user,__,{dataSources}) => {
            return dataSources.userDatabaseData.getLabelsOfUser(user.uid);
        },
        assignmentsGroup : async (user,__,{dataSources}) => {
            return dataSources.assignmentsDatabaseData.getAssignmentsGroupForUser(user.uid);
        },
        assignmentsPrivate : async (user,__,{dataSources}) => {
            return dataSources.assignmentsDatabaseData.getAssignmentsPrivateForUser(user.uid);
        },
        schedulePrivate : async (user,__,{dataSources}) => {
            return dataSources.scheduleDatabaseData.getSchedulePrivateOfUser(user.uid);
        },
        scheduleGroup : async (user,__,{dataSources}) => {
            return dataSources.scheduleDatabaseData.getScheduleGroupOfUser(user.uid);
        },
    }
}