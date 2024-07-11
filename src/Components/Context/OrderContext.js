import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    { id: 1, cliente: "Juan Pérez", productos: "Zapatos, Camisa", cantidad: 2, precioUnitario: 50, total: 100 },
    { id: 2, cliente: "Jose Hernandez", productos: "Zapatos, Camisa", cantidad: 2, precioUnitario: 50, total: 100 }
  ]);

  const addOrder = (order) => {
    setOrders([...orders, { ...order, id: orders.length + 1 }]);
  };

  return (
    <OrderContext.Provider value={{ orders, setOrders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
