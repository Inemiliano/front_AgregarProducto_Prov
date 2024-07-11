import React, { useState, useContext } from 'react';
import { TiHome } from "react-icons/ti";
import { MdModeEdit } from "react-icons/md";
import { TbBasketCancel } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './Pedidos.css';
import { OrderContext } from '../Context/OrderContext';

const Pedidos = () => {
  const navigate = useNavigate();
  const { orders, setOrders } = useContext(OrderContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [cancelIndex, setCancelIndex] = useState(null);

  const handleHomeClick = () => {
    navigate('/home'); 
  };

  const handleRealizarPedidoClick = () => {
    navigate('/VerProductos');
  };

  const handleSearchClick = () => {
    // Lógica para buscar en la tabla
    console.log(`Buscar cliente: ${searchQuery}`);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveClick = () => {
    setEditIndex(null);
  };

  const handleCancelClick = (index) => {
    setCancelIndex(index);
  };

  const handleConfirmCancel = () => {
    const updatedPedidos = orders.filter((_, i) => i !== cancelIndex);
    setOrders(updatedPedidos);
    setCancelIndex(null);
  };

  const handleCancelNo = () => {
    setCancelIndex(null);
  };

  const handleInputChange = (e, field, index) => {
    const updatedPedidos = [...orders];
    if (field === 'cantidad') {
      updatedPedidos[index][field] = parseInt(e.target.value);
      updatedPedidos[index].total = updatedPedidos[index].cantidad * updatedPedidos[index].precioUnitario;
    } else {
      updatedPedidos[index][field] = e.target.value;
    }
    setOrders(updatedPedidos);
  };

  const filteredPedidos = orders.filter(pedido => 
    pedido.cliente.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pedidos-container">
      <header className="header">
        <button className="home" onClick={handleHomeClick}>
          <TiHome className="home-icon" />
          <span>Inicio</span>
        </button>
        <h1>Pedidos</h1>
      </header>
      <main className="main-content">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Buscar cliente" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button className="buscar-cliente" onClick={handleSearchClick}>
            <IoMdSearch />
          </button>
          <button className="realizar-pedido" onClick={handleRealizarPedidoClick}>
            Realizar Pedido
          </button>
        </div>
        <table className="tabla-pedidos">
          <thead>
            <tr>
              <th>Id Pedido</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredPedidos.map((pedido, index) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>
                  {editIndex === index ? (
                    <input 
                      type="text" 
                      value={pedido.cliente}
                      onChange={(e) => handleInputChange(e, 'cliente', index)} 
                    />
                  ) : (
                    pedido.cliente
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input 
                      type="text" 
                      value={pedido.productos}
                      onChange={(e) => handleInputChange(e, 'productos', index)} 
                    />
                  ) : (
                    pedido.productos
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input 
                      type="number" 
                      value={pedido.cantidad}
                      onChange={(e) => handleInputChange(e, 'cantidad', index)} 
                    />
                  ) : (
                    pedido.cantidad
                  )}
                </td>
                <td>{pedido.total}</td>
                <td className="action-buttons">
                  <button className="action-button edit" onClick={() => handleEditClick(index)}>
                    <MdModeEdit className="icon" />
                    <span className="text">Modificar</span>
                  </button>
                  <button className="action-button delete" onClick={() => handleCancelClick(index)}>
                    <TbBasketCancel className="icon" />
                    <span className="text">Cancelar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editIndex !== null && (
          <div className="save-container">
            <button className="guardar-cambios" onClick={handleSaveClick}>
              Guardar
            </button>
          </div>
        )}
        {cancelIndex !== null && (
          <div className="confirm-cancel-container">
            <div className="confirm-cancel-box">
              <p>¿Está seguro de cancelar el pedido?</p>
              <div className="confirm-cancel-buttons">
                <button className="confirm-cancel-button confirm-cancel-yes" onClick={handleConfirmCancel}>Sí</button>
                <button className="confirm-cancel-button confirm-cancel-no" onClick={handleCancelNo}>No</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Pedidos;
