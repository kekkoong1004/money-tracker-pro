import { createContext, useState } from 'react';

const periodContext = createContext({
  setPeriod: ({ quantity, unit }) => {},
  from: () => {},
  to: new Date(),
});

function calculateDate(operator, days) {
  if (operator === '+') {
    const stamp = new Date().setDate(new Date().getDate() + days);
    return new Date(stamp);
  } else {
    const stamp = new Date().setDate(new Date().getDate() - days);
    return new Date(stamp);
  }
}

export const PeriodContextProvider = ({ children }) => {
  const [contextState, setContextState] = useState({
    to: calculateDate('+', 1),
    from: calculateDate('-', 7),
  });

  function setPeriodHandler({ quantity, unit }) {
    let days;
    // console.log({ quantity, unit });
    switch (unit) {
      case 'week':
      case 'weeks':
        days = quantity * 7;
        break;
      case 'month':
      case 'months':
        days = quantity * 30;
        break;
      case 'year':
      case 'years':
        days = quantity * 365;
        break;
      default:
        days = 7;
        break;
    }

    const newState = {
      ...contextState,
      from: calculateDate('-', days),
    };

    setContextState(newState);
  }

  const context = {
    setPeriod: setPeriodHandler,
    to: contextState.to,
    from: contextState.from,
  };

  return (
    <periodContext.Provider value={context}>{children}</periodContext.Provider>
  );
};

export default periodContext;
