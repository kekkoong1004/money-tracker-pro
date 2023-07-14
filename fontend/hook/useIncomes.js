import useSWR from 'swr';
import fetcher from './fetcher';
import { getToken } from '../utils/auth';

function useIncomes(date) {
  const token = getToken();
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/v1/income/get-all-incomes/${date}`,
    url => fetcher(url, { Authorization: 'Bearer ' + token })
  );

  // render data
  return { data, error, isLoading, mutate };
}

export default useIncomes;
