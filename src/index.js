const { ApolloServer } = require('apollo-server');
require('dotenv').config();
const resolvers = require('./resolvers');
const internalEngineDemo = require('./engine-demo');
const isEmail = require('isemail');
const typeDefs = require('./schema');
const testDataSource = require("./datasources/dataSource.js");

const dataSources = () => ({
    testDataSource : new testDataSource(),
})

const context = async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null }

};


const server = new ApolloServer({
    typeDefs,
    resolvers,
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


