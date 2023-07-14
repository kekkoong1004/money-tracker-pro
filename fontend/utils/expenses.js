const baseURL = 'http://localhost:3000/api/v1';
import { getToken } from './auth';
import axios from 'axios';

export function totalExpenses(expensesArray) {
  const expenses = expensesArray;

  let total = 0;
  if (expenses.length !== 0) {
    expenses.forEach(expense => {
      total += expense.amount;
    });
  }
  return total;
}

export async function addExpense(newExpense) {
  const token = getToken();
  // await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await axios.post(
    `${baseURL}/expense/add-expense`,
    newExpense,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (response.status !== 201) {
    throw new Error('Adding new expense failed');
  }

  const data = response.data;
  return data;
}

export async function updateExpense(id, updateField) {
  const token = getToken();
  const response = await axios.patch(
    `${baseURL}/expense/update-expense/${id}`,
    updateField,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error('Update expense failed');
  }
  console.log(response);
  const data = response.data;
  return data;
}

export async function deleteExpense(id) {
  const token = getToken();
  const response = await axios.delete(
    `${baseURL}/expense/delete-expense/${id}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (response.status !== 200) {
    const error = response.data;
    return {
      status: 'failed',
      message: error.message,
    };
  }

  const data = await response.data;
  console.log('delete data: ', data);
  return data;
}

export async function getExpenseByCategory() {
  const token = getToken();
  const response = await fetch(`${baseURL}/expense/get-expense-category`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error,
    };
  }

  const data = await response.json();
  return data;
}
