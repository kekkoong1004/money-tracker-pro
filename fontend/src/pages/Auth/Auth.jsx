import AuthForm from '../../../components/form/AuthForm';
import {
  useActionData,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { checkIsEmailOrUsername } from '../../../utils/helpers';
import { loginHandler } from '../../../utils/auth';
import { useEffect } from 'react';

function Auth() {
  const tokenStillValid = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();

  let error;

  if (actionData && actionData.status === 'failed') {
    error = actionData.message;
  }

  useEffect(() => {
    if (tokenStillValid) {
      navigate('/');
    }
  }, [tokenStillValid]);

  return (
    <div className=" bg-yellow-100 h-screen flex justify-center items-center">
      <AuthForm error={error} />
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const emailOrUsername = checkIsEmailOrUsername(
    formData.get('emailOrUsername')
  );

  const data = {
    password: formData.get('password'),
  };

  if (emailOrUsername === 'email') {
    data.email = formData.get('emailOrUsername');
  }

  if (emailOrUsername === 'username') {
    data.username = formData.get('emailOrUsername');
  }

  try {
    const response = await fetch('http://localhost:3000/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return response;
    }

    const resData = await response.json();
    // example resData = { status: 'success', token: '*token-string, user: user,expiresAt:tokenValidity.exp }
    const { token, user } = resData;
    const loggedIn = loginHandler(token, user);
    if (!loggedIn) {
      throw json({ status: 'failed', message: 'Failed to login.' });
    }
    return redirect('/');
  } catch (error) {
    console.log(error.message);
    return {
      status: 'failed',
      message: error.message,
    };
  }
}

export default Auth;
