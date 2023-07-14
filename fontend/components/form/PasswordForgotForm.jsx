import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../utils/user';
import { checkEmailIsValid } from '../../utils/helpers';

function PasswordForgotForm() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification && notification.status === 'pending') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [notification]);

  const submitHandler = async e => {
    e.preventDefault();
    setNotification({
      status: 'pending',
      message: 'Request in progress...',
    });

    // Check if the email is valid
    const emailIsValid = checkEmailIsValid(email);
    if (!emailIsValid) {
      setNotification({
        status: 'failed',
        message: 'New Password and Confirm Password not same!',
      });
      return;
    }

    const reset = await resetPassword({ email });
    setNotification({
      status: reset.status,
      message: reset.message ? reset.message : reset.error,
    });

    if (reset.status === 'success') {
      navigate('/renewPassword');
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-8  justify-center items-center"
    >
      <div className="flex items-center max-w-full max-h-full">
        <label
          htmlFor="email"
          className="text-2xl font-semibold text-zinc-600 mr-4"
        >
          Email address
        </label>
        <input
          className="rounded-md h-12 w-5/6 border-none outline-none px-4 text-2xl text-slate-500 shadow-xl"
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="pt-4 text-center">
        {notification && (
          <p
            className={`text-xl  font-medium ${
              notification.status === 'success'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {notification.message}
          </p>
        )}
      </div>

      <div className="flex gap-8 justify-center items-center">
        <button
          onClick={() => navigate('/auth')}
          type="button"
          className="block w-52 text-center py-2 rounded-lg text-lg font-medium shadow-xl bg-stone-400 text-zinc-100 hover:translate-x-0.5 hover:translate-y-0.5 transition active:translate-x-0 active:translate-y-0 hover:text-white hover:bg-slate-600"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={buttonDisabled}
          className={`py-2 px-4 rounded-lg text-white bg-slate-400 text-xl font-semibold shadow-xl hover:scale-105 hover:bg-slate-500 transition ${
            buttonDisabled ? 'hover:bg-slate-400 hover:scale-100' : ''
          }`}
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}

export default PasswordForgotForm;
