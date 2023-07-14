import { incomeCategories, expenseCategories } from './categories';

export function initialLabelState(view) {
  if (view === 'Income') {
    return incomeCategories.map(cat => cat.name);
  }
  if (view === 'Expense') {
    return expenseCategories.map(cat => cat.name);
  }
}

export function groupTransactionsToDate(data) {
  const groupedData = {};

  data.forEach(transaction => {
    const readableDate = transaction.date.split('T')[0];

    if (!groupedData[readableDate]) {
      groupedData[readableDate] = [];
      groupedData[readableDate].push(transaction);
    } else {
      groupedData[readableDate].push(transaction);
    }
  });

  return groupedData;
}

export function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function checkIsEmailOrUsername(input) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

  if (isEmail) {
    return 'email';
  } else {
    return 'username';
  }
}

export function checkEmailIsValid(input) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

  if (isEmail) {
    return true;
  } else {
    return false;
  }
}
