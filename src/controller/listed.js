// const db = require("../../db/db")

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://access:read2022@maincluster.egjxnl6.mongodb.net/?retryWrites=true&w=majority&ssl=true";
exports.getListedData = async (req, res) => {
    try {
        const {
            limit,
            collection_slug
        } = req.query;
        if (limit == null || limit == undefined || limit == "" ||
            collection_slug == undefined || collection_slug == null || collection_slug == ""
        ) {
            return res.send(400).send({
                success: false,
                msg: "parmeter missing"
            })
        }
        let filter = {
                collection_slug: collection_slug,
            }
        
             MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            let dbo = db.db("opensea");
                dbo.collection("listeds").find(filter).skip(parseInt(limit)).limit(parseInt(limit)).toArray((err, result)=>{
            if (err) throw err;
                res.status(200).json({
                    result
                })
            });
        });
    } catch (e) {
        res.status(200).send({
            msg: e.message
        })
        console.error("error while", e);
    }
}