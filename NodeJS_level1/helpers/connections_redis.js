const redis = require("redis");
const client = redis.createClient();

client
    .on('ready', () => console.log('Connected to Redis.'))
    .on('error', err => console.error('Redis error', err));

client.connect().then(() => {

    client.ping().then(response => console.log(response));

});

module.exports = client;