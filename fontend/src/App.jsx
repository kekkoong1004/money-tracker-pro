import Navigation from '../components/Navigation';
import Orb from '../components/Orb';
import Main from './pages/Main';

function App() {
  return (
    <div className="p-8 flex bg-amber-100 bg-opacity-80 h-screen gap-4 relative overflow-hidden font-custom">
      <Orb />
      <Navigation />
      <Main />
    </div>
  );
}

export default App;
