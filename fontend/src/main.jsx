import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from '../store/user-context.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { action as updateProfileAction } from './pages/userProfile/Profile.jsx';
import RootElement, {
  loader as rootLoader,
} from '../components/RootElement.jsx';
import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Auth, { action as authAction } from './pages/Auth/Auth.jsx';
import { checkAuth } from '../utils/auth.js';
import { action as logoutAction } from './pages/Auth/Logout.js';
import { action as passwordChangeAction } from '../components/form/PasswordChangeForm.jsx';
import PasswordResetPage from './pages/Auth/PasswordResetPage.jsx';
import PasswordRenewPage from './pages/Auth/PasswordRenewPage.jsx';
import Register, { action as registerAction } from './pages/Auth/Register.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootElement />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'auth',
        element: <Auth />,
        action: authAction,
        loader: checkAuth,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'updateUser',
        action: updateProfileAction,
      },
      {
        path: 'updatePassword',
        action: passwordChangeAction,
      },
      {
        path: 'forgotPassword',
        element: <PasswordResetPage />,
      },
      {
        path: 'renewPassword',
        element: <PasswordRenewPage />,
      },
    ],
  },
  {
    path: '/logout',
    action: logoutAction,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
