import React, { useContext, useState } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './PedidosCliente.css';
import { OrderContext } from '../Context/OrderContext';

const PedidosCliente = () => {
  const navigate = useNavigate();
  const { orders, updateOrderQuantity, removeOrder } = useContext(OrderContext);
  const [showMessage, setShowMessage] = useState(true);

  const handleBackClick = () => {
    navigate('/Velasport'); 
  };

  const handleQuantityChange = (index, newQuantity) => {
    updateOrderQuantity(index, newQuantity);
  };

  const handleRemoveClick = (index) => {
    removeOrder(index);
  };

  const calculateTotal = () => {
    return orders.reduce((total, order) => total + (order.precioUnitario * order.cantidad), 0);
  };

  const handleMessageClose = () => {
    setShowMessage(false);
  };

  const handlePaymentClick = () => {
    navigate('/Pago');
  };

  return (
    <div className="cliente-pedidos-container">
      {showMessage && (
        <div className="cliente-message-overlay">
          <div className="cliente-message-box">
            <p>Para confirmar la elaboración de sus productos deberá pagar como mínimo el 50% del total de todos sus productos y recogerlo en nuestra sucursal</p>
            <button onClick={handleMessageClose} className="cliente-message-button">Ok</button>
          </div>
        </div>
      )}
      <header className="cliente-pedidos-header">
        <button className="cliente-pedidos-back" onClick={handleBackClick}>
          <TiArrowBackOutline className="cliente-pedidos-back-icon" />
          <span>Volver</span>
        </button>
        <h1 className="cliente-pedidos-title">Mis pedidos</h1>
      </header>
      <main className="cliente-pedidos-main">
        {orders.map((order, index) => (
          <div key={index} className="cliente-pedido-card">
            <div className="cliente-pedido-image">
              <img src={order.productImage || "placeholder.png"} alt={order.productName} />
            </div>
            <div className="cliente-pedido-info">
              <p>{order.productName} {order.size ? `- Talla: ${order.size}` : ''}</p>
            </div>
            <div className="cliente-pedido-quantity">
              <input 
                type="number" 
                value={order.cantidad} 
                min="1"
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
              />
              <span>pz.</span>
            </div>
            <div className="cliente-pedido-total">
              <p>Total: ${(order.precioUnitario * order.cantidad).toFixed(2)}</p>
            </div>
            <div className="cliente-pedido-delete">
              <MdDelete className="cliente-delete-icon" onClick={() => handleRemoveClick(index)} />
            </div>
          </div>
        ))}
        <div className="cliente-pedidos-summary">
          <p className="cliente-grand-total">Grand Total: ${calculateTotal().toFixed(2)}</p>
          <button className="cliente-pagar-button" onClick={handlePaymentClick}>Pagar 50%</button>
        </div>
      </main>
    </div>
  );
};

export default PedidosCliente;
