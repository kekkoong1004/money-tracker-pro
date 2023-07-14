const baseURL = 'http://localhost:3000/api/v1';
import { getToken } from './auth';

export async function getAllIncomes() {
  const token = getToken();
  const response = await fetch(`${baseURL}/income/get-all-incomes`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error.message,
    };
  }

  const data = await response.json();

  return data;
}

export async function addIncome(newIncome) {
  const token = getToken();
  const response = await fetch(`${baseURL}/income/add-income`, {
    method: 'POST',
    body: JSON.stringify(newIncome),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const data = await response.json();
  return data;
}

export async function updateIncome(updateField) {
  const token = getToken();
  const response = await fetch(`${baseURL}/income/update-income`, {
    method: 'PATCH',
    body: JSON.stringify(updateField),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  const data = await response.json();
  return data;
}

export async function deleteIncome(id) {
  const token = getToken();
  const response = await fetch(`${baseURL}/income/delete-income/${id}`, {
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

export function totalIncome(incomesArray) {
  const incomes = incomesArray;

  let total = 0;
  if (incomes && incomes.length !== 0) {
    incomes.forEach(income => {
      total += income.amount;
    });
  }

  return total;
}
