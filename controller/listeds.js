var mongoose = require('mongoose');
var db = mongoose.connection;
exports.getListedData = async (req, res) => {
    try {
        const {
            limit,
            slug,
            period
        } = req.query;
        if (slug == undefined || slug == null || slug == ""
        ) {
            return res.status(400).send({
                success: false,
                msg: "parmeter missing"
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

        let filter 
        if(searchTime == 0){
        filter = {
                collection_slug: slug,
            }
        }else{
            filter = {
                timestamp: {
                    $gt: searchTime
                },
                collection_slug: slug
            }
        }      
            db.collection("listeds").find(filter).limit(searchLimit).sort(sort).toArray((err, result)=>{
            
            if (err) throw err;
                res.status(200).json({
                    result
                })
            });

    } catch (e) {
        console.error("error while", e);
        res.status(200).send({
            msg: e.message
        })
        
    }
}