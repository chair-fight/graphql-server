const { gql } = require('apollo-server');



const dateTypeDefs = gql`
    scalar  Date
`
module.exports = dateTypeDefs