import useSWR from 'swr';
import fetcher from './fetcher';
import { getToken } from '../utils/auth';

function useExpenses(date) {
  const token = getToken();
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/v1/expense/get-all-expenses/${date}`,
    url => fetcher(url, { Authorization: 'Bearer ' + token })
  );

  // render data
  return { data, error, isLoading, mutate };
}

export default useExpenses;
