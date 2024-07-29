import React, { createContext, useState, useEffect } from 'react';

export const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  // Función para cargar las ventas desde el servidor
  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/ventas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const salesData = await response.json();
      setSales(salesData);
    } catch (error) {
      console.error('Error fetching sales:', error);
      setError('Failed to load sales data.');
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <SalesContext.Provider value={{ sales, setSales, error }}>
      {children}
    </SalesContext.Provider>
  );
};
