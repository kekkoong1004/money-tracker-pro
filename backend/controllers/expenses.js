const Expense = require('../models/expenseModal');
const { queryOptions } = require('../helpers/queryFeatures');
const mongoose = require('mongoose');

exports.addExpense = async (req, res) => {
  const userId = req.userId;

  const { title, category, date, amount, description } = req.body;

  if (!title || !category) {
    return res.status(400).json({ message: 'some field is missing.' });
  }

  if (amount <= 0 || typeof amount !== 'number') {
    return res.status(400).json({
      status: 'failed',
      message: 'Amount must be exceed zero and a number.',
    });
  }

  const newExpense = new Expense({
    title,
    category,
    date,
    amount,
    description,
    user: userId,
  });

  try {
    await newExpense.save();
    return res
      .status(201)
      .json({ status: 'success', message: 'Saving to database success.' });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: 'failed', message: 'Saving to database failed.' });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const dateString = req.params.date;
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const query = Expense.find({
      user: req.userId,
      date: {
        $gte: `${year}-${month}-01`,
        $lt: `${year}-${month + 1}-01`,
      },
    }).sort({ date: -1 });
    const finalQuery = queryOptions(req.query, query);

    const expenses = await finalQuery;
    return res.status(200).json({ status: 'success', data: expenses });
  } catch (error) {
    return res.status(400).json({ status: 'failed', error: error.message });
  }
};

exports.getExpense = async (req, res) => {
  const { id } = req.params;
  console.log(req.userId);
  try {
    const expense = await Expense.findOne({
      _id: id,
      user: req.userId,
    });
    return res.status(200).json({ data: expense });
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const field = req.body;

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, user: req.userId },
      field,
      {
        returnDocument: 'after',
      }
    );
    return res.status(200).json({ status: 'success', data: updatedExpense });
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoc = await Expense.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    return res
      .status(200)
      .json({ status: 'success', message: 'expense data deleted.' });
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'failed', message: 'Something went wrong.' });
  }
};
