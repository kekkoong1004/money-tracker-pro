const express = require('express');
const router = express.Router();
const { checkAuthMiddleware } = require('../helpers/auth');

const {
  addExpense,
  getAllExpenses,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenses');

router.use(checkAuthMiddleware);
router
  .post('/add-expense', addExpense)
  .get('/get-all-expenses/:date', getAllExpenses)
  .get('/get-expense/:id', getExpense)
  .delete('/delete-expense/:id', deleteExpense)
  .patch('/update-expense/:id', updateExpense);

module.exports = router;
