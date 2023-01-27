const axios = require('axios');
require('dotenv').config();

const handleError = (error) => {
    console.error(`An error occurred while sending the request: ${error}`);
};

// Return the transfers details for the provided token id.
async function getTransfersById(graphqlEndpoint, tokenId) {
    const query = `
    {
        transfers(where :{tokenId: "${tokenId}"} orderBy:blockNumber, orderDirection:asc ) {
        id
        tokenId
        from
        to
        blockNumber
        transactionHash
        }
    }`;

    try {

        const response = await axios.post(graphqlEndpoint, {
            query
        });
        const transfers = response.data.data;
        return transfers;

    } catch (error) {

        handleError(error);
    }
}

// Returns the details of the provided token id.
async function getTokenDetails(graphqlEndpoint, tokenId) {
    const query = `
    {
        polygonApe(id: "${tokenId}") {
            id
            name
            symbol
            creator
            newOwner
            tokenURI
            blockNumber
          }
    }`;

    try {

        const response = await axios.post(graphqlEndpoint, {
            query
        });
        const details = response.data.data;
        return details;

    } catch (error) {

        handleError(error);
    }
}

/*
    Returns the receiver and tx hash of the token mints. 
    If the skip and limit parameter are not provided, they default to 0 and 1000.
    1000 is the max queries that you can retrieve at once.
*/
async function gettokensMints(graphqlEndpoint, skip, limit) {

    // If one either skip or limit are provided, both must be specified.
    if (skip == null || skip === undefined && limit == null || limit === undefined) {
        skip = 0;
        limit = 1000;
    }

    if (limit > 1000) {
        console.error(`The maximum limit allowed to query is 1000.`)
        return;
    }

    const query = `
    {
        transfers(orderBy: tokenId,
          orderDirection: asc,
          skip: ${skip},
          first: ${limit},
          where: {from: "0x0000000000000000000000000000000000000000"})
        {
          tokenId
          to
          transactionHash  
        } 
      }
      
        `;

    try {

        const response = await axios.post(graphqlEndpoint, {
            query
        });
        const mints = response.data.data;
        return mints;

    } catch (error) {

        handleError(error);
    }
}

const graphqlEndpoint = process.env.SUBGRAPH_URL
const tokenId = 501

const skip = 5
const limit = 50

//getTransfersById(graphqlEndpoint, tokenId).then(console.log)
//getTokenDetails(graphqlEndpoint, tokenId).then(console.log)
//gettokensMints(graphqlEndpoint, skip, limit).then(console.log)

// Export functions to use in other files.
module.exports = {
    getTransfersById,
    getTokenDetails,
    gettokensMints,
}