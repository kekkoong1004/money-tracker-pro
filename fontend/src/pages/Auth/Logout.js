import { redirect } from 'react-router-dom';

export function action() {
  localStorage.removeItem('pro-money-tracker-token');
  localStorage.removeItem('pro-money-tracker-token-duration');
  localStorage.removeItem('pro-money-tracker-token-user');
  return redirect('/');
}
