import React, { createContext, useState } from 'react';

export const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  return (
    <SalesContext.Provider value={{ sales, setSales }}>
      {children}
    </SalesContext.Provider>
  );
};
