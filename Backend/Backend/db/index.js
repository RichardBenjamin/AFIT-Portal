const {Client} = require("pg");
require("dotenv").config()
console.log();
const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
});

client.connect();

module.exports = client;