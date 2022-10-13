// const db = require("../../db/db")
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://access:read2022@maincluster.egjxnl6.mongodb.net/?retryWrites=true&w=majority&ssl=true";
exports.getSoldsData = async (req, res) => {
    try {
        const {
            period,
            slug,
            limit
        } = req.query;
        if (slug == undefined || slug == null || slug == "") {
            return res.status(400).send({
                success: false,
                msg: "collection slug missing"
            })
        }
        let searchTime = 0;
        let searchLimit = 0;
        let sort = {}
        if(limit != undefined){
            searchLimit = parseInt(limit)
            sort={$natural:-1}
            
        }
        if(period != undefined){
            switch (period) {
                case "15M":
                    searchTime = (Math.floor(new Date().getTime()) - (900 * 1000))
                    break;
                case "1H":
                    searchTime = (Math.floor(new Date().getTime()) - (3600 * 1000))
                    break;
                case "1D":
                    searchTime = (Math.floor(new Date().getTime()) - (86400 * 1000))
                    break;
                case "7D":
                    searchTime = (Math.floor(new Date().getTime()) - (604800 * 1000))
                    break;
                case "30D":
                    searchTime = (Math.floor(new Date().getTime()) - (2629743 * 1000))
                    break;
                default:
                    searchTime = 0;
                    break;
            }
        }
        let filter = {}
        if (searchTime == 0) {
            filter = {
                collection_slug: slug
            }
        } else {
            filter = {
                timestamp: {
                    $gt: searchTime
                },
                collection_slug: slug
            }
        }
        MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            const dbo = db.db("opensea");
            let result = await dbo.collection("solds").find(filter).sort(sort).limit(searchLimit).toArray();
            res.status(200).send({
                result
            })
        });
    } catch (e) {
        res.status(200).send({
            msg: e.message
        })
        console.error("error while", e);
    }
}