import { useState } from 'react';
import { updatePassword } from '../../utils/user';

function PasswordChangeForm({ user, setRenderedForm }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const submitHandler = async e => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setNotification({
        status: 'failed',
        message: 'New Password and Confirm Password not same!',
      });
      return;
    }

    const updatePasswordFields = {
      currentPassword,
      newPassword,
    };

    const result = await updatePassword(user._id, updatePasswordFields);
    if (result.status === 'error')
      setNotification({ status: 'failed', message: result.error });
    if (result.status === 'success') {
      setNotification({
        status: 'success',
        message: 'Successfully updated password!',
      });
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
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

      <div className="flex items-center">
        <label
          htmlFor="currentPassword"
          className="w-1/2 text-2xl font-semibold text-zinc-600"
        >
          Current Password
        </label>
        <input
          className="w-1/2  rounded-md h-12 border-none outline-none p-4 text-lg text-slate-500 shadow-xl"
          type="password"
          name="currentPassword"
          id="currentPassword"
          value={currentPassword}
          minLength={6}
          required
          onChange={e => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <label
          htmlFor="newPassword"
          className="w-1/2  text-2xl font-semibold text-zinc-600"
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
      <div className="flex items-center">
        <label
          htmlFor="confirmNewPassword"
          className="w-1/2  text-2xl text-zinc-600 font-semibold"
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

      <div className="flex gap-8 justify-center items-center py-8">
        <button
          type="button"
          onClick={() => setRenderedForm('userProfile')}
          className="block w-52 text-center py-2 rounded-lg text-lg font-medium shadow-xl bg-stone-400 text-zinc-100 hover:translate-x-0.5 hover:translate-y-0.5 transition active:translate-x-0 active:translate-y-0 hover:text-white hover:bg-slate-600"
        >
          Back
        </button>
        <button className="py-2 px-4 rounded-lg text-white bg-slate-400 text-xl font-semibold shadow-xl hover:scale-105 hover:bg-slate-500 transition">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default PasswordChangeForm;

export async function action({ request }) {
  const userId = formData.get('userId');
  const currentPassword = formData.get('currentPassword');
  const newPassword = formData.get('newPassword');
  const confirmNewPassword = formData.get('confirmNewPassword');

  if (newPassword !== confirmNewPassword) {
    return {
      status: 'failed',
      error: 'New Password and Confirm New Password are different.',
    };
  }

  const updatePasswordFields = {
    currentPassword,
    newPassword,
  };

  const result = await updatePassword(userId, updatePasswordFields);
  // if (result.status === 'success') {
  //   return redirect('/');
  // } else {
  //   console.log(result);
  //   return {
  //     result: result.status,
  //     message: result.error.message,
  //   };
  // }
  return redirect('/');
}
