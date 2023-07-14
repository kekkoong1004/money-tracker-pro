const baseURL = 'http://localhost:3000/api/v1';
import { getToken } from './auth';

export function totalExpenses(expensesArray) {
  const expenses = expensesArray;

  let total = 0;
  expenses.forEach(expense => {
    total += expense.amount;
  });
  return total;
}

export async function addExpense(newExpense) {
  const token = getToken();
  // await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await fetch(`${baseURL}/expense/add-expense`, {
    method: 'POST',
    body: JSON.stringify(newExpense),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw new Error('Adding new expense failed');
  }

  const data = await response.json();
  return data;
}

export async function updateExpense(id, updateField) {
  const token = getToken();
  const response = await fetch(`${baseURL}/expense/update-expense/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updateField),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw new Error('Update expense failed');
  }

  const data = await response.json();
  return data;
}

export async function deleteExpense(id) {
  const token = getToken();
  const response = await fetch(`${baseURL}/expense/delete-expense/${id}`, {
    method: 'DELETE',
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
  console.log(data);
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
