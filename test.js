const { getTransfersById, getTokenDetails, gettokensMints} = require('./index')
require('dotenv').config()

const graphqlEndpoint = process.env.SUBGRAPH_URL
const tokenId = 501
const skip = 5
const limit = 50

getTransfersById(graphqlEndpoint, tokenId).then(console.log)
getTokenDetails(graphqlEndpoint, tokenId).then(console.log)
gettokensMints(graphqlEndpoint, skip, limit).then(console.log)