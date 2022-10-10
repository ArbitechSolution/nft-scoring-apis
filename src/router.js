const express = require("express");
const bodyParser = require("body-parser");
const {getSoldsData} = require("./controller/solds");
const {getListedData} = require("./controller/listed")
const router = express.Router();
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());


router.route("/saleListing").get(getSoldsData);
router.route("/listedData").get(getListedData);

module.exports = router;
