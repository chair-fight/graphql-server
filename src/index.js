const { ApolloServer } = require('apollo-server');
const { gql } = require('apollo-server');
const _ = require('lodash')
require('dotenv').config();
const internalEngineDemo = require('./engine-demo');
const isEmail = require('isemail');

const userTypeDefs = require('./entities/user/user-schema');
const groupTypeDefs = require('./entities/group/group-schema');
const userResolvers = require('./entities/user/user-resolvers');
const groupResolvers = require('./entities/group/group-resolvers');

const UserDatabaseDataSource = require("./datasources/userDatabaseDataSource.js");
const GroupDatabaseDataSource = require("./datasources/groupDatabaseDataSource");
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
    groupDatabaseData : new GroupDatabaseDataSource(db)
})

const context = async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null }

};

const baseTypeDefs = gql`
    type Query
    type Mutation
`


const server = new ApolloServer({
    typeDefs : [baseTypeDefs,userTypeDefs,groupTypeDefs],
    resolvers : _.merge({},userResolvers,groupResolvers),
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
    server.listen().then(() => {
        console.log(`
      Server is running!
      Listening on port 4000
      Query at https://studio.apollographql.com/dev
    `);
    });
}


