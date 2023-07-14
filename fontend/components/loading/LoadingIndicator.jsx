import { useEffect, useState } from 'react';

function LoadingIndicator() {
  const [dot, setDot] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDot(prevState => {
        if (prevState === '...') {
          return '';
        } else {
          return (prevState += '.');
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-8 rounded-xl bg-white/50 shadow-lg">
      <h1 className="text-xl font-normal">Loading{dot}</h1>
    </div>
  );
}

export default LoadingIndicator;
