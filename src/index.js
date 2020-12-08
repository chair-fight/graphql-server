const { ApolloServer } = require('apollo-server');

const resolvers = require('./resolvers');
const { createStore } = require('./utils');


const server = new ApolloServer({
    resolvers,
    introspection: true,
    playground: true,

    engine: {
        apiKey: process.env.ENGINE_API_KEY,
    },
});


