import { Form } from 'react-router-dom';

function UserProfileForm({ user, renderPasswordForm, renderImageChange }) {
  return (
    <Form method="put" action="/updateUser" className="flex flex-col gap-8">
      <input
        hidden
        required
        defaultValue={user ? user._id : ''}
        name="userId"
      />
      <div className="flex items-center">
        <label
          htmlFor="fullName"
          className="w-1/2 text-2xl font-semibold text-zinc-600"
        >
          Username
        </label>
        <input
          className="w-1/2  rounded-md h-12 border-none outline-none p-4 text-lg text-slate-500 shadow-xl"
          type="text"
          name="username"
          id="username"
          defaultValue={user ? user.username : ''}
        />
      </div>
      <div className="flex items-center">
        <label
          htmlFor="displayName"
          className="w-1/2  text-2xl font-semibold text-zinc-600"
        >
          Display Name
        </label>
        <input
          type="text"
          name="displayName"
          defaultValue={user ? user.displayName : ''}
          id="displayName"
          className="w-1/2 rounded-md h-12 border-none outline-none p-4 text-lg text-slate-500 shadow-xl"
        />
      </div>
      <div className="flex items-center">
        <label
          htmlFor="email"
          className="w-1/2  text-2xl text-zinc-600 font-semibold"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={user ? user.email : ''}
          className="w-1/2 rounded-md h-12 border-none outline-none p-4 text-lg text-slate-500 shadow-xl"
        />
      </div>
      <div className="flex gap-16 justify-center items-center py-8">
        <button
          type="button"
          onClick={renderPasswordForm}
          className="block w-52 text-center py-2 rounded-lg text-lg font-medium shadow-xl bg-stone-400 text-zinc-100 hover:translate-x-0.5 hover:translate-y-0.5 transition active:translate-x-0 active:translate-y-0 hover:text-white hover:bg-slate-600"
        >
          Change Password
        </button>
        <button
          onClick={renderImageChange}
          type="button"
          className="block w-52 text-center py-2 rounded-lg text-lg font-medium shadow-xl bg-stone-400 text-zinc-100 hover:translate-x-0.5 hover:translate-y-0.5 transition active:translate-x-0 active:translate-y-0 hover:text-white hover:bg-slate-600"
        >
          Change Profile Image
        </button>
      </div>

      <div className="ml-auto pt-4">
        <button
          className="py-2 px-4 rounded-lg text-white bg-slate-400 text-xl font-semibold shadow-xl hover:scale-105 hover:bg-slate-500 transition
    "
        >
          Save Changes
        </button>
      </div>
    </Form>
  );
}

export default UserProfileForm;
