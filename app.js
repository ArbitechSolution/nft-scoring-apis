const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors')
app.use(cors())


const router = require('./routes')();
app.use('/api', router);

app.get('/', (req, res) => {
  res.send({value: "hello"});
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on the port::5000");
});


