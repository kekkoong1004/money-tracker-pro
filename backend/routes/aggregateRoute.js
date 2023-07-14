const express = require('express');
const router = express.Router();
const { checkAuthMiddleware } = require('../helpers/auth');
const {
  getFilterData,
  getAllYears,
  getTransactions,
  testAggregate,
} = require('../controllers/aggregate');

router.use(checkAuthMiddleware);

router
  .get('/getFilterData', getFilterData)
  .get('/getAllYears', getAllYears)
  .get('/getTransactions', getTransactions)
  .get('/testAggregate', testAggregate);
module.exports = router;
