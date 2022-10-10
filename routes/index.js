const express = require('express');

module.exports = () =>  {
  const router = express.Router();
  console.log("-----------")
  const collectionslug = require('./collectionslug.route')()
  router.use('/collection', collectionslug);
  return router;
};