const baseURL = 'http://localhost:3000/api/v1';
import { getToken } from './auth';

export async function getFilterData(query) {
  const token = getToken();
  const { filterBy, view, year, month } = query;
  const response = await fetch(
    `${baseURL}/aggregate/getFilterData?filterBy=${filterBy}&view=${view}&year=${year}&month=${month}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

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

export async function getAllYears(view) {
  const token = getToken();
  const response = await fetch(
    `${baseURL}/aggregate/getAllYears?view=${view}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error,
    };
  }

  const data = await response.json();

  if (data.results.length === 0) {
    return null;
  }

  let oldestDate = data.results[0]['smallestDateDocument'].date;
  let latestDate = data.results[0]['greatestDateDocument'].date;

  const oldestYear = new Date(oldestDate).getFullYear();
  const latestYear = new Date(latestDate).getFullYear();
  const result = { oldestYear, latestYear };
  return result;
}

export async function getTransactions({ from, to }) {
  const token = getToken();
  const dateFrom = from.toISOString().split('T')[0];
  const dateTo = to.toISOString().split('T')[0];

  try {
    const response = await fetch(
      `${baseURL}/aggregate/getTransactions?from=${dateFrom}&to=${dateTo}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error({
        status: 'error',
        message: error,
      });
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
