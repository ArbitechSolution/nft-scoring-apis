const { MongoClient }= require("mongodb");
require("dotenv").config;
const URL ="mongodb+srv://access:read2022@maincluster.egjxnl6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    ignoreUndefined: true,
  });
   client.connect();
  const databaseName = "opensea";
  const db = client.db(databaseName);
module.exports = db;