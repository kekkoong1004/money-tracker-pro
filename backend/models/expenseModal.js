const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema(
  {
    type: {
      type: String,
      default: 'expense',
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
      default: 'expense',
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    amount: {
      type: Number,
      min: 1,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ExpenseSchema.virtual('amountInMYR').get(function () {
  return this.amount * 4.63;
});

module.exports = mongoose.model('Expense', ExpenseSchema);
