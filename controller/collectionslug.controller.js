
const axios = require('axios')

// Function to get Database of MongoDB
const getCollectionTrend = async (period) =>{
  const collection = await axios.get(`https://api.nftinit.io/api/getTrendingCollections/?format=json&period=${period}`);
  return collection.data;
}

const getFloorPrice = async (collectionName, timestamp) =>{
  const collection = await axios.get(`https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=${collectionName}&type=floor_price&start=${timestamp}`);
  return collection.data;
}

const getListedCount = async (collectionName, timestamp) => {
  const collection = await axios.get(`https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=${collectionName}&type=listed_count&start=${timestamp}`);
  return collection.data;
}

const getOneDayVolume = async (collectionName, timestamp) => {
  const collection = await axios.get(`https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=${collectionName}&type=one_day_volume&start=${timestamp}`);
  return collection.data;
}

const getOneDaySales = async (collectionName, timestamp) => {
  const collection = await axios.get(`https://api.nftinit.io/api/chart/?password=Gunah4423_&slug=${collectionName}&type=one_day_sales&start=${timestamp}`);
  return collection.data;
}

const getSaleChart = async (collectionName) => {
  const collection = await axios.get(`https://api.nftinit.io/api/sale_chart/?slug=${collectionName}&tc=true&tn=true`);
  return collection.data;
}

module.exports = {
  getCollectionTrend,
  getFloorPrice,
  getListedCount,
  getOneDayVolume,
  getOneDaySales,
  getSaleChart
}