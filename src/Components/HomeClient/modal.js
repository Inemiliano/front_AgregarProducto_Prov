import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modal.css';

const Modal = ({ show, onClose, onSubmit, product }) => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [apellidoCliente, setApellidoCliente] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [fechaPedido, setFechaPedido] = useState('');
  const [total, setTotal] = useState(parseFloat(product.price).toFixed(2));

  useEffect(() => {
    setTotal((cantidad * parseFloat(product.price)).toFixed(2));
  }, [cantidad, product.price]);

  const handleSubmit = async () => {
    if (!nombreCliente || !apellidoCliente || !fechaPedido) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const orderData = {
      nombreCliente,
      apellidoCliente,
      estado: 'pendiente',
      cantidad,
      fechaPedido,
      producto: product.name,
      precio: parseFloat(product.price).toFixed(2),
      total
    };

    try {
      const response = await axios.post('http://localhost:4000/pedidos/agregar', orderData);
      console.log('Order successfully sent:', response.data);

      alert('Pedido agregado correctamente.');
      onSubmit(orderData);
      onClose();
    } catch (error) {
      console.error('Error sending order:', error);
      alert('Hubo un error al agregar el pedido. Por favor, intenta de nuevo.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Realizar Pedido</h2>
        <label>
          Nombre:
          <input type="text" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
        </label>
        <label>
          Apellido:
          <input type="text" value={apellidoCliente} onChange={(e) => setApellidoCliente(e.target.value)} />
        </label>
        <label>
          Cantidad:
          <input 
            type="number" 
            value={cantidad} 
            min="1" 
            onChange={(e) => setCantidad(Number(e.target.value))} 
          />
        </label>
        <label>
          Fecha de Pedido:
          <input 
            type="date" 
            value={fechaPedido} 
            onChange={(e) => setFechaPedido(e.target.value)} 
          />
        </label>
        <div className="product-price">
          <p>Precio del Producto: ${parseFloat(product.price).toFixed(2)}</p>
        </div>
        <div className="order-total">
          <p>Total: ${total}</p>
        </div>
        <button onClick={handleSubmit}>Enviar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default Modal;
