const express = require("express");
const cors = require("cors");
require("dotenv").config;
const crypto = require("crypto")
const router = require("./src/router")
const app = express();
app.use(cors());

app.use("/v2", router)
app.get("/",(req, res)=>{
res.status(200).send("server running 🆗")
})
const port = process.env.PORT || 7070;
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})