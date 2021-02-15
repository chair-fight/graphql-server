
const lod = require('lodash');

module.exports = {
    Query : {
        getUser: async (_, {firebaseID}, {dataSources}) => {
            return dataSources.userDatabaseData.getUserWithFID(firebaseID);
        },
        getAllUsers: async (_, __, {dataSources}) => {
            return dataSources.userDatabaseData.getAllUsers();
        },
    },
    Mutation : {
        createUser : async (_,{firebaseID,email},{dataSources}) => {
            return dataSources.userDatabaseData.createUser(firebaseID,email);
        },
        updateUser : async (_,{firebaseID,newName,newSurname},{dataSources}) => {
            return dataSources.userDatabaseData.updateUser(firebaseID,newName,newSurname);
        },
        deleteUser : async (_,{firebaseID},{dataSources}) => {
            return !!dataSources.userDatabaseData.deleteUser(firebaseID);
        }
    },
    User : {
        groups : async (user,__,{dataSources}) => {
            return dataSources.userDatabaseData.getUserGroups(user.uid);
        },
    }
}