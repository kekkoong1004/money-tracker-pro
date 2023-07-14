import { Form, Link } from 'react-router-dom';

function RegisterForm({ actionData }) {
  let error;
  if (actionData && actionData.status === 'failed') {
    error = actionData.message;
  }

  return (
    <div className=" bg-yellow-100 h-full p-12">
      <h1 className="text-center text-3xl font-semibold">Sign Up</h1>

      <Form method="post" className="m-4 p-4 ">
        <div className="mt-4 w-1/2 mx-auto">
          <p className="flex flex-col gap-2 mb-4 w-full">
            <label
              className="block text-2xl text-gray-500 font-semibold w-2/3"
              htmlFor="username"
            >
              Username :
            </label>
            <input
              className="px-4 py-4 rounded-md w-full outline-none text-xl text-slate-600"
              id="username"
              type="text"
              required
              name="username"
            />
          </p>
          <p className="flex flex-col gap-2 mb-4 w-full">
            <label
              className="block text-2xl text-gray-500 font-semibold w-2/3"
              htmlFor="email"
            >
              Email :
            </label>
            <input
              className="px-4 py-4 rounded-md w-full outline-none text-xl text-slate-600"
              id="email"
              type="email"
              required
              name="email"
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
          <p className="flex flex-col gap-2 mb-4 w-full">
            <label
              className="block text-2xl text-gray-500 font-semibold w-2/3"
              htmlFor="confirmPassword"
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
          <p className="flex gap-12 my-4 w-full">
            <div className="flex gap-2 text-xl">
              <input
                className="w-6"
                type="radio"
                id="male"
                value="male"
                name="gender"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex gap-2 text-xl">
              <input
                className="w-6"
                type="radio"
                id="female"
                value="female"
                name="gender"
              />
              <label htmlFor="female">Female</label>
            </div>
          </p>
        </div>
        <p className="text-center my-8 text-red-500 text-xl font-semibold">
          {error}
        </p>
        <div className="flex flex-col gap-2 my-8 w-1/2 mx-auto">
          <button className="text-center bg-orange-500 py-3 rounded-lg text-xl font-semibold tracking-wider hover:text-white hover:bg-orange-400">
            Register
          </button>
        </div>
      </Form>
      <div className="text-center text-sky-500 text-xl hover:underline hover:text-sky-400">
        <Link to="/auth">Back to Login</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
