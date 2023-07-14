import React, { useState } from 'react';
const initialToken = localStorage.getItem('pro-money-tracker-token');

const userContext = React.createContext({
  token: null,
  user: null,
  isLoggedIn: false,
  updateUserInfo: updatedUserInfo => {},
  login: id => {},
  logout: () => {},
  contentShown: 1,
  changeContentShown: (id, data) => {},
  contentData: null,
  popup: false,
});

export default userContext;

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(initialToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [contentShown, setContentShown] = useState(1);
  const [contentData, setContentData] = useState(null);
  const [popup, setPopup] = useState(true);

  const loginHandler = (token, expiresAt, userData) => {
    localStorage.setItem('pro-money-tracker-token', token);
    localStorage.setItem('pro-money-tracker-token-expires', expiresAt);
    setToken(token);
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logoutHandler = () => {
    localStorage.removeItem('pro-money-tracker-token');
    localStorage.removeItem('pro-money-tracker-token-expires');
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateHandler = updatedUserInfo => {
    localStorage.setItem(
      'pro-money-tracker-token-user',
      JSON.stringify(updatedUserInfo)
    );
    setUser(updatedUserInfo);
  };

  const contentShownHandler = (id, data) => {
    setContentShown(id);
    setContentData(data);
  };

  const popupHandler = status => {
    setPopup(status);
  };

  const context = {
    token: token,
    user: user,
    isLoggedIn: isLoggedIn,
    updateUserInfo: updateHandler,
    login: loginHandler,
    logout: logoutHandler,
    changeContentShown: contentShownHandler,
    contentShown: contentShown,
    contentData: contentData,
    popup: popup,
    setPopup: popupHandler,
  };
  return (
    <userContext.Provider value={context}>{children}</userContext.Provider>
  );
};
