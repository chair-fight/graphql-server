
const lod = require('lodash');

module.exports = {
    Query : {
        getLabelsOfUser: async (_, {uid}, {dataSources}) => {
            return dataSources.userDatabaseData.getLabelsOfUser(uid);
        },
        getLabelsOfGroup: async (_, {gid}, {dataSources}) => {
            return dataSources.groupDatabaseData.getLabelsOfGroup(gid);
        },
    },
    Mutation : {
        addLabelToUser : async (_,{name,color,uid},{dataSources}) => {
            return !!await dataSources.userDatabaseData.addLabelForUser(name, color, uid);
        },
        addLabelToGroup : async (_,{name,color,gid},{dataSources}) => {
            return !!await dataSources.groupDatabaseData.addLabelForGroup(name, color, gid);
        }
    }
}