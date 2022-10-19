const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors')
var mongoose = require('mongoose');

app.use(cors())

mongoose.connect('mongodb+srv://access:read2022@maincluster.egjxnl6.mongodb.net/opensea?retryWrites=true&w=majority&ssl=true',{ useNewUrlParser: true}); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB")
});
const router = require('./routes')();
app.use('/api', router);

app.get('/', (req, res) => {
  res.send({value: "hello"});
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on the port::5000");
});


