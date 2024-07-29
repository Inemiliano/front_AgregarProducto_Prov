import React, { createContext, useState } from 'react';

// Crear el contexto para las órdenes
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    // Ejemplo de datos iniciales
    { id: 1, cliente: "Juan Pérez", productName: "Zapatos", size: "M", cantidad: 2, precioUnitario: 50, total: 100, productImage: "placeholder.png" },
    { id: 2, cliente: "Jose Hernandez", productName: "Camisa", size: "L", cantidad: 1, precioUnitario: 50, total: 50, productImage: "placeholder.png" }
  ]);

  // Función para agregar una nueva orden
  const addOrder = (order) => {
    setOrders([...orders, { ...order, id: orders.length + 1 }]);
  };

  // Función para actualizar la cantidad de una orden existente
  const updateOrderQuantity = (index, newQuantity) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, cantidad: newQuantity, total: order.precioUnitario * newQuantity } : order
    );
    setOrders(updatedOrders);
  };

  // Función para eliminar una orden
  const removeOrder = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  return (
    <OrderContext.Provider value={{ orders, setOrders, addOrder, updateOrderQuantity, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
