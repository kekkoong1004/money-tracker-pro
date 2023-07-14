const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncomeSchema = new Schema(
  {
    type: {
      type: String,
      default: 'income',
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
      default: 'Income',
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
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

IncomeSchema.virtual('amountInMYR').get(function () {
  return this.amount * 4.63;
});

IncomeSchema.pre('save', function (next) {
  console.log(this); // 'this' here refer to pre-saved document
  // Do some stuff like validation,removing dependent documents (removing a user removes all their incomes and expenses)
  next();
});

// IncomeSchema.post('save', function (doc, next) {
//   next();
// });

module.exports = mongoose.model('Income', IncomeSchema);
