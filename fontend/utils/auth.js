export function getToken() {
  const token = localStorage.getItem('pro-money-tracker-token');

  return token;
}

export function loginHandler(token, user) {
  localStorage.setItem('pro-money-tracker-token', token);
  localStorage.setItem('pro-money-tracker-token-user', JSON.stringify(user));

  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 1);
  localStorage.setItem(
    'pro-money-tracker-token-duration',
    expiration.getTime()
  );

  return true;
}

export function logoutHandler() {
  localStorage.deleteItem('pro-money-tracker-token');
  localStorage.deleteItem('pro-money-tracker-token-user');
  localStorage.deleteItem('pro-money-tracker-token-duration');
}

export function getUserFromLocalStorage() {
  const userString = localStorage.getItem('pro-money-tracker-token-user');
  const user = JSON.parse(userString);
  return user;
}

function getTokenDuration() {
  const timeString = localStorage.getItem('pro-money-tracker-token-duration');
  const expAt = +timeString;
  return expAt;
}

export function checkAuth() {
  const token = getToken;
  if (!token) {
    return false;
  }

  const expiresAt = getTokenDuration();
  const now = Date.now();

  const tokenStillValid = expiresAt - now >= 0 ? true : false;

  return tokenStillValid;
}
