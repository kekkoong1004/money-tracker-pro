import { useRouteError, Link } from 'react-router-dom';
import Orb from '../../components/Orb';

const ErrorPage = () => {
  const error = useRouteError();
  console.log('from Error page: ', error);
  let status = error.status;
  let message = error.statusText;

  if (error) {
    console.log(error);
    status = error.status || 500;
    message = JSON.parse(error.data).message || 'Something went wrong!';
  }

  return (
    <div className="p-8 text-center relative h-screen overflow-hidden bg-amber-300 bg-opacity-75">
      <Orb />
      <div className="z-50">
        <h1 className="text-3xl font-bold p-4">
          Some Error Happened : {status ? status : 'Something went wrong'}
        </h1>
        <h3 className="text-xl font-semibold mb-6">
          {message ? message : 'Something went wrong.'}
        </h3>
        <Link
          className="relative text-blue-400 cursor-pointer text-3xl hover:text-blue-300 hover:underline transition"
          to="/"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
