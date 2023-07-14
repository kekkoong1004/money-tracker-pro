const express = require('express');
const router = express.Router();
const {
  addIncome,
  getAllIncomes,
  getIncome,
  deleteIncome,
  updateIncome,
  topFourIncomes,
} = require('../controllers/income');
const { checkAuthMiddleware } = require('../helpers/auth');

router.use(checkAuthMiddleware);

router
  .post('/add-income', addIncome)
  .get('/get-all-incomes/:date', getAllIncomes)
  .get('/get-4-highest-incomes', topFourIncomes, getAllIncomes)
  .get('/get-income/:id', getIncome)
  .delete('/delete-income/:id', deleteIncome)
  .put('/update-income/:id', updateIncome);

module.exports = router;
