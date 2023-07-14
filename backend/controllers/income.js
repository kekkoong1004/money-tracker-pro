const Income = require('../models/IncomeModal');
const { queryOptions } = require('../helpers/queryFeatures');
const { checkingTokenValidity } = require('../helpers/auth');

exports.addIncome = async (req, res) => {
  const userId = req.userId;
  const { title, category, date, amount, description } = req.body;

  if (!title || !category) {
    return res.status(400).json({ message: 'some field is missing.' });
  }

  if (amount <= 0 || typeof amount !== 'number') {
    return res
      .status(400)
      .json({ message: 'Amount must be exceed zero and a number.' });
  }

  const newIncome = new Income({
    title,
    category,
    date,
    amount,
    description,
    user: userId,
  });

  try {
    await newIncome.save();
    return res.status(201).json({ message: 'Saving to database success.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Saving to database failed.' });
  }
};

exports.getAllIncomes = async (req, res) => {
  const userId = req.userId;
  const date = req.params.date;
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;

  try {
    const query = Income.find({
      user: req.userId,
      date: {
        $gte: `${year}-${month}-01`,
        $lt: `${year}-${month + 1}-01`,
      },
    }).sort({
      date: -1,
    });
    const finalQuery = queryOptions(req.query, query);

    // Exec query finally
    const incomes = await finalQuery;

    return res
      .status(200)
      .json({ status: 'success', numOfResult: incomes.length, data: incomes });
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error });
  }
};

exports.getIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const income = await Income.find({ _id: id, user: userId });
    if (!income) throw new Error('Not found');
    return res.status(200).json({ data: income });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const deletedDoc = await Income.findOneAndRemove({ _id: id, user: userId });

    if (!deletedDoc) throw new Error('Not found');
    return res.status(200).json({ message: 'Income data deleted.' });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const field = req.body;

  try {
    const updatedIncome = await Income.findOneAndUpdate(
      { _id: id, user: userId },
      field,
      {
        returnDocument: 'after',
      }
    );
    if (!updatedIncome) throw new Error('Not found');
    return res.status(200).json({ data: updatedIncome });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong.' });
  }
};

exports.topFourIncomes = (req, res, next) => {
  req.query.limit = '4';
  req.query.sort = '-amount';
  next();
};
