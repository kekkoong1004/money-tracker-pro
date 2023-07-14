import React from 'react';

function Backdrop({ children }) {
  return <div className="absolute top-0 w-full h-full  z-100">{children}</div>;
}

export default Backdrop;
