import RegisterForm from '../../../components/form/RegisterForm';
import { useActionData, redirect } from 'react-router-dom';
import { checkEmailIsValid } from '../../../utils/helpers';
import { loginHandler } from '../../../utils/auth';

function Register() {
  const actionData = useActionData();
  return <RegisterForm actionData={actionData} />;
}

export default Register;

export async function action({ request, params }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const username = formData.get('username');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const gender = formData.get('gender');

  const emailIsValid = checkEmailIsValid(email);
  if (!emailIsValid) {
    return {
      status: 'failed',
      message: 'Invalid email address',
    };
  }

  if (username.length < 8) {
    return {
      status: 'failed',
      message: 'Username need at least 8 characters',
    };
  }

  if (password !== confirmPassword) {
    return {
      status: 'failed',
      message: "Password doesn't match with confirm password",
    };
  }

  if (password.length < 6) {
    return {
      status: 'failed',
      message: 'Password need to have at least 6 characters.',
    };
  }

  if (!gender) {
    return {
      status: 'failed',
      message: 'Please provide a gender.',
    };
  }

  const userData = {
    email,
    username,
    password,
    confirmPassword,
    gender,
  };

  const response = await fetch('http://localhost:3000/api/v1/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    return response;
  }

  const data = await response.json();

  if (data.status === 'success') {
    const { token, user } = data;
    loginHandler(token, user);
    return redirect('/');
  } else {
    return data;
  }
  s;
}
