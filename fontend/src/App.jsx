import Navigation from '../components/Navigation';
import Orb from '../components/Orb';
import Main from './pages/Main';
import axios from 'axios';

function App() {
  // Set up an Axios interceptor to handle responses
  axios.interceptors.response.use(
    response => {
      console.log('Intercepted response:', response);
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/auth';
      }
      return Promise.reject(error);
    }
  );
  return (
    <div className="p-8 flex bg-amber-100 bg-opacity-80 h-screen gap-4 relative overflow-hidden font-custom">
      <Orb />
      <Navigation />
      <Main />
    </div>
  );
}

export default App;
