
const lod = require('lodash');

module.exports = {
    Query : {
        getSchedulePrivateOfUser: async (_, {uid}, {dataSources}) => {
            return dataSources.scheduleDatabaseData.getSchedulePrivateOfUser(uid);
        }
    },
    Mutation : {
        addSchedulePrivateToUser : async (_,{name,uid},{dataSources}) => {
            return dataSources.scheduleDatabaseData.addSchedulePrivateToUser(name, uid);
        }
    }
}