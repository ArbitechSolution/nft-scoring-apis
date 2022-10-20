const mongoose = require("mongoose");
const URL = process.env.DB_URL;

const dbConnection = () => {
    try{
        mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database connected successfully");
    }catch(e){
        console.error("error while connect db");
    }
}

module.exports = dbConnection;