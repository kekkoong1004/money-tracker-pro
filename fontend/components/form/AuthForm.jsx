import { Form, Link } from 'react-router-dom';

function AuthForm({ error }) {
  return (
    <Form
      method="post"
      className="p-8 w-1/2 rounded-lg bg-yellow-200 bg-opacity-70 text-slate-700 font-mono"
    >
      <h1 className=" font-bold text-4xl pb-8">Login</h1>
      <p className="flex flex-col gap-2 mb-4 w-full">
        <label
          className="block text-2xl text-gray-500 font-semibold w-2/3"
          htmlFor="emailOrUsername"
        >
          Username or Email :
        </label>
        <input
          className="px-4 py-4 rounded-md w-full outline-none text-xl text-slate-600"
          type="text"
          required
          name="emailOrUsername"
        />
      </p>

      <p className="flex flex-col gap-2 mb-4 w-full">
        <label
          className="block text-2xl text-gray-500 font-semibold w-2/3"
          htmlFor="password"
        >
          Password :
        </label>
        <input
          className="px-4 py-4 rounded-md w-full outline-none text-xl text-slate-600"
          type="password"
          required
          name="password"
        />
      </p>
      <p className="text-red-500 text-lg font-semibold">{error}</p>

      {/* {authMode === 'register' && (
        <p className="flex flex-col gap-2 mb-4 w-full">
          <label
            className="block text-2xl text-gray-500 font-semibold w-2/3"
            htmlFor="confirm-password"
          >
            Confirm Password :
          </label>
          <input
            className="px-4 py-4 rounded-md w-full outline-none text-xl text-slate-600"
            type="password"
            required
            name="confirmPassword"
          />
        </p>
      )} */}
      {/* {authMode === 'register' && (
        <p className="w-full flex gap-8 text-xl px-4">
          <div className="flex gap-2">
            <input type="radio" id="male" name="gender" value="male" />
            <label for="male">Male</label>
          </div>
          <div className="flex gap-2">
            <input type="radio" id="female" name="gender" value="female" />
            <label for="female">Female</label>
          </div>
        </p>
      )} */}
      <p className="flex flex-col gap-2 my-8 w-full">
        <button className="text-center bg-orange-500 py-3 rounded-lg text-xl font-semibold tracking-wider hover:text-white hover:bg-orange-400">
          Login
        </button>
      </p>
      <p className="text-right px-2 text-lg">
        <Link to={'/register'}>
          New user?
          <span className="text-blue-600 hover:font-medium hover:underline hover:text-blue-400 ml-2">
            Register here
          </span>
        </Link>
      </p>
      <p className="text-right px-2 text-lg mt-4">
        <Link to={'/forgotPassword'}>
          Forgot your password?
          <span className="text-blue-600 hover:font-medium hover:underline hover:text-blue-400 ml-2">
            Click here to reset password
          </span>
        </Link>
      </p>
    </Form>
  );
}

export default AuthForm;
