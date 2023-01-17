
const { MongoClient } = require('mongodb');

let dbConnection;
const uri = 'mongodb+srv://Caesar:hoangoccho58@cluster0.pqcrl.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch(err => {
                console.log("Failed to connect");
                return cb(err);
            })
    },
    getDb: () => dbConnection
}