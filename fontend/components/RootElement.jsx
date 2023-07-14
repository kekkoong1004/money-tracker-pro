import { useEffect } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';
import { checkAuth } from '../utils/auth';

function RootElement() {
  const navigate = useNavigate();
  const auth = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!auth) {
      submit(null, { method: 'POST', action: '/logout' });
      navigate('/auth');
    }
  }, [auth]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default RootElement;

export function loader() {
  const userIsAuth = checkAuth();
  return userIsAuth;
}
