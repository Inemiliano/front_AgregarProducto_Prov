import React, { useState } from 'react';
import axios from 'axios';
import './modal.css';

const Modal = ({ show, onClose, onSubmit, product }) => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [apellidoCliente, setApellidoCliente] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [fechaPedido, setFechaPedido] = useState('');

  const handleSubmit = async () => {
    if (!nombreCliente || !apellidoCliente || !fechaPedido) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const orderData = {
      nombreCliente,
      apellidoCliente,
      estado: 'pendiente', // Estado predeterminado
      cantidad,
      fechaPedido,
      producto: product.name, // Nombre del producto
      precio: product.price // Precio del producto
    };

    try {
      const response = await axios.post('http://localhost:3000/pedidos/agregar', orderData);
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
          <input type="number" value={cantidad} min="1" onChange={(e) => setCantidad(e.target.value)} />
        </label>
        <label>
          Fecha de Pedido:
          <input type="date" value={fechaPedido} onChange={(e) => setFechaPedido(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Enviar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default Modal;

