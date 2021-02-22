
const lod = require('lodash');

module.exports = {
    Query : {
        getLabelsOfUser: async (_, {uid}, {dataSources}) => {
            return dataSources.userDatabaseData.getLabelsOfUser(uid);
        }
    },
    Mutation : {
        addLabelToUser : async (_,{name,color,uid},{dataSources}) => {
            return !!await dataSources.userDatabaseData.addLabelForUser(name, color, uid);
        }
    }
}