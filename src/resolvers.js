


module.exports = {
    Query : {
        getAllUsers: async (_ , __, { dataSources }) => {
            return dataSources.testDataSource.getAllUsers();
        },
        getAllGroups: async (_ , __, { dataSources }) => {
            return dataSources.testDataSource.getAllGroups();

        }
    },
    Mutation : {

    }
}
