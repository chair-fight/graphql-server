const { ApolloServer } = require('apollo-server');
const { gql } = require('apollo-server');
const _ = require('lodash')
require('dotenv').config();
const internalEngineDemo = require('./engine-demo');
const isEmail = require('isemail');

const dateTypeDefs = require('./scalars/date/date-schema');
const userTypeDefs = require('./entities/user/user-schema');
const groupTypeDefs = require('./entities/group/group-schema');
const labelTypeDefs = require('./entities/label/label-schema');
const assignmentGroupTypeDefs = require('./entities/assignment_group/assignment_group-schema');
const assignmentPrivateTypeDefs = require('./entities/assignment_private/assignment_private-schema');
const schedulePrivateTypeDefs = require('./entities/schedule_private/schedule_private-schema');
const scheduleEntryPrivateTypeDefs = require('./entities/schedule_entry_private/schedule_entry_private-schema');
const scheduleGroupTypeDefs = require('./entities/schedule_group/schedule_group-schema');
const scheduleEntryGroupTypeDefs = require('./entities/schedule_entry_group/schedule_entry_group-schema');

const dateResolvers = require('./scalars/date/date-resolver');
const userResolvers = require('./entities/user/user-resolvers');
const groupResolvers = require('./entities/group/group-resolvers');
const labelResolvers = require('./entities/label/label-resolvers');
const assignmentGroupResolvers = require('./entities/assignment_group/assignment_group-resolvers')
const assignmentPrivateResolvers = require('./entities/assignment_private/assignment_private-resolvers')
const schedulePrivateResolvers = require('./entities/schedule_private/schedule_private-resolvers');
const scheduleEntryPrivateResolvers = require('./entities/schedule_entry_private/schedule_entry_private-resolvers');
const scheduleGroupResolvers = require('./entities/schedule_group/schedule_group-resolvers');
const scheduleEntryGroupsResolvers = require('./entities/schedule_entry_group/schedule_entry_group-resolvers');

const UserDatabaseDataSource = require("./datasources/userDatabaseDataSource.js");
const GroupDatabaseDataSource = require("./datasources/groupDatabaseDataSource");
const AssignmentsDatabaseDataSource = require('./datasources/assignmentsDatabaseDataSource');
const ScheduleDatabaseDataSource = require('./datasources/scheduleDatabaseDataSource')
const knex = require('knex')
const { types } = require('pg')

const DATE_OID = 1082;
const parseDate = (value) => value;

types.setTypeParser(DATE_OID, parseDate);

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'psql2021',
        database : 'studbox'
    }
});

db.select('*').from('user').then(data => console.log(data[0].dateofcreation))


const dataSources = () => ({
    userDatabaseData : new UserDatabaseDataSource(db),
    groupDatabaseData : new GroupDatabaseDataSource(db),
    assignmentsDatabaseData : new AssignmentsDatabaseDataSource(db),
    scheduleDatabaseData : new ScheduleDatabaseDataSource(db)
})

const context = async ({ req }) => {
    // simple auth check on every request
    let returning = {}
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) { returning = _.merge(returning,{ user: null });}

    const scope = (req.headers && req.headers.scope) || '';
    if(scope)
    {
        returning = _.merge(returning,{ scope });
    }
    return returning;
};

const baseTypeDefs = gql`
    type Query
    type Mutation
`


const server = new ApolloServer({
    typeDefs : [baseTypeDefs
        ,dateTypeDefs
        ,userTypeDefs,groupTypeDefs
        ,labelTypeDefs
        ,assignmentGroupTypeDefs
        ,assignmentPrivateTypeDefs
        ,schedulePrivateTypeDefs
        ,scheduleEntryPrivateTypeDefs
        ,scheduleGroupTypeDefs
        ,scheduleEntryGroupTypeDefs
    ],
    resolvers : _.merge({}
        ,dateResolvers
        ,userResolvers,groupResolvers
        ,labelResolvers
        ,assignmentGroupResolvers
        ,assignmentPrivateResolvers
        ,schedulePrivateResolvers
        ,scheduleEntryPrivateResolvers
        ,scheduleGroupResolvers
        ,scheduleEntryGroupsResolvers
    ),
    dataSources,
    context,
    introspection: true,
    playground: true,
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
        ...internalEngineDemo
    },
});




if (process.env.NODE_ENV !== 'test') {
    server.listen({ port: process.env.PORT || 4000 }).then(() => {
        console.log(`
      Server is running!
      Listening on port 4000
      Query at https://studio.apollographql.com/dev
    `);
    });
}


