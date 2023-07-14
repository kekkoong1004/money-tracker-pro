import { useContext } from 'react';
import userContext from '../../store/user-context';
import Profile from './userProfile/Profile';
import Income from './Contents/Income';
import Expense from './Contents/Expense';
import Transaction from './Contents/Transaction';
import Dashboard from './Contents/Dashboard';
import ItemDetail from './Contents/ItemDetail';
import { FilterContextProvider } from '../../store/filter-context';
import { PeriodContextProvider } from '../../store/period-context';

function Main() {
  const userCtx = useContext(userContext);
  const { contentShown } = userCtx;

  const displayData = () => {
    switch (contentShown) {
      case 0:
        return <Profile />;
      case 1:
        return <Income />;
      case 2:
        return <Expense />;
      case 3:
        return (
          <PeriodContextProvider>
            <Transaction />
          </PeriodContextProvider>
        );
      case 4:
        return (
          <FilterContextProvider>
            <Dashboard />
          </FilterContextProvider>
        );
      case 5:
        return <ItemDetail />;
      default:
        return <Income />;
    }
  };

  return (
    <div className="flex flex-col grow bg-white/50 rounded-lg backdrop-blur-md overflow-hidden">
      {displayData()}
    </div>
  );
}

export default Main;
