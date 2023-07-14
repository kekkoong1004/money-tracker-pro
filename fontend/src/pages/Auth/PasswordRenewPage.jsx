import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { renewPassword } from '../../../utils/user';

function PasswordRenewPage() {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setNotification({
        status: 'failed',
        message: 'New Password and Confirm Password not same!',
      });
      return;
    }

    const renewPasswordField = {
      resetToken,
      newPassword,
      confirmNewPassword,
    };

    const result = await renewPassword(renewPasswordField);
    if (result.status === 'error') {
      setNotification({ status: 'failed', message: result.error });
      setResetToken('');
      setNewPassword('');
      setConfirmNewPassword('');
    }

    if (result.status === 'success') {
      setNotification({
        status: 'success',
        message: 'Successfully updated password!',
      });
      setTimeout(() => {
        navigate('/auth');
      }, 1000);
    }
  };

  return (
    <div className=" bg-yellow-100 h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-8 w-full px-12"
      >
        {notification && (
          <p
            className={`text-lg  font-medium ${
              notification.status === 'success'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {notification.message}
          </p>
        )}

        <div className="flex items-center justify-center">
          <label
            htmlFor="resetToken"
            className="w-1/5 text-2xl font-semibold text-zinc-600"
          >
            Reset Token
          </label>
          <input
            className="w-1/2  rounded-md h-12 border-none outline-none p-4 text-lg text-slate-500 shadow-xl"
            type="text"
            placeholder="Place check your email for reset token"
            name="resetToken"
            id="resetToken"
            value={resetToken}
            required
            onChange={e => setResetToken(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <label
            htmlFor="newPassword"
            className="w-1/5 text-2xl font-semibold text-zinc-600"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            minLength={6}
            required
            onChange={e => setNewPassword(e.target.value)}
            id="newPassword"
            className="w-1/2 rounded-md h-12 border-none outline-none p-4 text-lg text-slate-500 shadow-xl"
          />
        </div>
        <div className="flex items-center justify-center">
          <label
            htmlFor="confirmNewPassword"
            className="w-1/5 text-2xl text-zinc-600 font-semibold"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            value={confirmNewPassword}
            minLength={6}
            required
            onChange={e => setConfirmNewPassword(e.target.value)}
            className="w-1/2 rounded-md h-12 border-none outline-none p-4 text-lg text-slate-500 shadow-xl"
          />
        </div>

        <div className="text-center pt-4 ">
          <button className="py-2 px-4 rounded-lg text-white bg-slate-400 text-xl font-semibold shadow-xl hover:scale-105 hover:bg-slate-500 transition">
            Renew Password
          </button>
        </div>
        <div className="flex gap-8 justify-center items-center py-8">
          <button
            type="button"
            onClick={() => navigate('/auth')}
            className="block w-52 text-center py-2 rounded-lg text-lg font-medium shadow-xl bg-stone-400 text-zinc-100 hover:translate-x-0.5 hover:translate-y-0.5 transition active:translate-x-0 active:translate-y-0 hover:text-white hover:bg-slate-600"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordRenewPage;
