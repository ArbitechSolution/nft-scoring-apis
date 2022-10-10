const express = require('express')

const collectionslugController = require('../controller/collectionslug.controller');

const {getSoldsData} = require("../controller/solds");
const {getListedData} = require("../controller/listeds")

async function getTreding(req, res) {
  try {
    console.log("req", req.query.period)
    if(!req.query.period) return res.send({message: 'Can not find params'})
    let collectionslug = await collectionslugController.getCollectionTrend(req.query.period)
    return res.send({response: "Ok", result: collectionslug});
  } catch (err) {
    return res.status(500).send({response: "Error", result: err})
  }
}
async function getFloorPrice(req, res) {
  try {
    if(!(req.query.collectionName && req.query.timestamp)) return res.send({message: 'Can not find params'})
    let collectionslug = await collectionslugController.getFloorPrice(req.query.collectionName, req.query.timestamp)
    return res.send({response: "Ok", result: collectionslug});
  } catch (err) {
    return res.status(500).send({response: "Error", result: err})
  }
}
async function getListedCount(req, res) {
  try {
    if(!req.query.collectionName) return res.send({message: 'Can not find params'})
    let collectionslug = await collectionslugController.getListedCount(req.query.collectionName)
    return res.send({response: "Ok", result: collectionslug});
  } catch (err) {
    return res.status(500).send({response: "Error", result: err})
  }
}

async function getOneDayVolume(req, res) {
  try {
    if(!(req.query.collectionName && req.query.timestamp)) return res.send({message: 'Can not find params'})
    let collectionslug = await collectionslugController.getOneDayVolume(req.query.collectionName, req.query.timestamp)
    return res.send({response: "Ok", result: collectionslug});
  } catch (err) {
    return res.status(500).send({response: "Error", result: err})
  }
}

async function getOneDaySales(req, res) {
  try {
    if(!(req.query.collectionName && req.query.timestamp)) return res.send({message: 'Can not find params'})
    let collectionslug = await collectionslugController.getOneDaySales(req.query.collectionName, req.query.timestamp)
    return res.send({response: "Ok", result: collectionslug});
  } catch (err) {
    return res.status(500).send({response: "Error", result: err})
  }
}

async function getSaleChart(req, res) {
  try {
    if(!req.query.collectionName) return res.send({message: 'Can not find params'})
    let collectionslug = await collectionslugController.getSaleChart(req.query.collectionName)
    return res.send({response: "Ok", result: collectionslug});
  } catch (err) {
    return res.status(500).send({response: "Error", result: err})
  }
}


module.exports = () => {
  const collectionslug = express.Router();
  collectionslug.get('/Trending', getTreding);
  collectionslug.get('/FloorPrice', getFloorPrice);
  collectionslug.get('/ListedCount', getListedCount);
  collectionslug.get('/OneDayVolume', getOneDayVolume);
  collectionslug.get('/OneDaySales', getOneDaySales);
  collectionslug.get('/SaleChart', getSaleChart);
  collectionslug.get("/SaleListing",getSoldsData);
  collectionslug.get("/ListedData",getListedData);

  return collectionslug;
};