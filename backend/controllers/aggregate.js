const Income = require('../models/IncomeModal');
const Expense = require('../models/expenseModal');
const { getMonthDigit } = require('../helpers/utils.js');
const mongoose = require('mongoose');

exports.getFilterData = async (req, res) => {
  const query = req.query;
  const { filterBy, view, year, month } = query;
  const pipeline = [];
  console.log(query);

  const alterData = { filterBy, view, year, month };

  let Model = view === 'Income' ? Income : Expense;
  let gte = '';
  let lt = '';

  pipeline.push({
    $match: {
      user: new mongoose.Types.ObjectId(req.userId),
    },
  });

  if (filterBy === 'Yearly') {
    gte = `${year}-01-01`;
    lt = `${+year + 1}-01-01`;

    pipeline.push({
      $match: {
        date: {
          $gte: new Date(gte),
          $lt: new Date(lt),
        },
      },
    });
  }

  if (filterBy === 'Monthly') {
    alterData.month = getMonthDigit(month);
    alterData.month += 1;

    gte = `${year}-${+alterData.month}-01`;
    lt = `${year}-${+alterData.month + 1}-01`;

    pipeline.push({
      $match: {
        date: {
          $gte: new Date(gte),
          $lt: new Date(lt),
        },
      },
    });
  }

  // For 'filterBy' === 'All time', can straight match all income or expense data matching to userId
  pipeline.push({
    $group: {
      _id: `$category`,
      totalAmount: { $sum: '$amount' },
      count: { $sum: 1 },
      // incomes: { $push: '$title' },
    },
  });

  try {
    const results = await Model.aggregate(pipeline).sort({ totalAmount: 1 });
    console.log(results);
    if (!results) throw new Error('Not found');
    return res.status(200).json({ data: results });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Something went wrong.', error: error.message });
  }
};

exports.getAllYears = async (req, res) => {
  const { view } = req.query;
  console.log(view);

  let Model = view === 'Income' ? Income : Expense;
  try {
    const results = await Model.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.userId) },
      },
      {
        $sort: {
          date: 1, // Sorting in ascending order of 'date' field
        },
      },
      {
        $group: {
          _id: null,
          smallestDateDocument: { $first: '$$ROOT' },
          greatestDateDocument: { $last: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 0,
          smallestDateDocument: 1,
          greatestDateDocument: 1,
        },
      },
    ]);
    if (!results) throw new Error('Not found');
    return res.status(200).json({ results });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Something went wrong.', error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  const { from, to } = req.query;

  try {
    const incomes = await Income.find({
      user: req.userId,
      date: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });
    const expenses = await Expense.find({
      user: req.userId,
      date: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });

    const mergedData = [...incomes, ...expenses];
    mergedData.sort((a, b) => b.date - a.date);

    return res.status(200).json({
      mergedData,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Something went wrong.', error: err.message });
  }
};

exports.testAggregate = async (req, res) => {
  const pipeline = [];
  console.log('userId: ', req.userId);
  pipeline.push({
    $match: {
      user: new mongoose.Types.ObjectId(req.userId),
    },
  });

  // pipeline.push({
  //   $match: {
  //     amount: { $gte: 10 },
  //   },
  // });

  // pipeline.push(
  //   {
  //     $group: {
  //       _id: '$category',
  //       'totalAmount $': { $sum: '$amount' },
  //       quantity: { $sum: 1 },
  //       'Highest Income': { $max: { title: '$title', amount: '$amount' } },
  //       'Lowest Income': { $min: { title: '$title', amount: '$amount' } },
  //       'All incomes': { $push: '$$ROOT' },
  //     },
  //   },
  //   {
  //     $sort: {
  //       'totalAmount $': -1,
  //     },
  //   },
  //   // {
  //   //   $project: {
  //   //     'All incomes': 0,
  //   //   },
  //   // },
  //   {
  //     $unwind: '$All incomes',
  //   }
  // );

  console.log(pipeline);

  try {
    const result = await Income.aggregate(pipeline);
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Something went wrong.', error: error.message });
  }
};
