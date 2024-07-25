import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TiHome } from "react-icons/ti";
import { MdModeEdit } from "react-icons/md";
import { TbBasketCancel } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5"; 
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Pedidos.css';
import { OrderContext } from '../Context/OrderContext';
import Notification from './Notification';
import { ModeContext } from '../Context/ModeContext';
import { SalesContext } from '../Context/SalesContext'; 

const Pedidos = () => {
  const navigate = useNavigate();
  const { orders, setOrders } = useContext(OrderContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [cancelIndex, setCancelIndex] = useState(null);
  const [notification, setNotification] = useState(null);
  const { mode, setMode } = useContext(ModeContext);
  const { sales, setSales } = useContext(SalesContext); 

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pedidos/');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    fetchPedidos();
  }, [setOrders]);

  const handleHomeClick = () => {
    navigate('/home'); 
  };

  const handleBackClick = () => {
    setMode('default');
    navigate('/VerVentas'); 
  };

  const handleRealizarPedidoClick = () => {
    navigate('/VerProductos');
  };

  const handleSearchClick = () => {
    console.log(`Buscar cliente: ${searchQuery}`);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveClick = async () => {
    if (editIndex !== null) {
      const pedidoToUpdate = orders[editIndex];
      const { idPedido, nombreCliente, apellidoCliente, estado, cantidad, fechaPedido } = pedidoToUpdate;

      // Convertir fecha a formato YYYY-MM-DD
      const formattedFechaPedido = new Date(fechaPedido).toISOString().split('T')[0]; // '2024-07-18'

      try {
        const response = await axios.put(`http://localhost:3000/pedidos/actualizar/${idPedido}`, {
          nombreCliente,
          apellidoCliente,
          estado,
          cantidad,
          fechaPedido: formattedFechaPedido
        });

        if (response.status === 200) {
          // Actualiza la lista de pedidos con los cambios
          const updatedPedidos = [...orders];
          updatedPedidos[editIndex] = { ...pedidoToUpdate, fechaPedido: formattedFechaPedido };
          setOrders(updatedPedidos);

          setEditIndex(null);
          setNotification('Pedido modificado con éxito');
        } else {
          setNotification('Error al modificar el pedido. Por favor, inténtelo de nuevo.');
        }
      } catch (error) {
        console.error('Error al modificar el pedido:', error);
        setNotification('Error al modificar el pedido. Por favor, inténtelo de nuevo.');
      }
    }
  };

  const handleCancelClick = (index) => {
    setCancelIndex(index);
  };

  const handleConfirmCancel = async () => {
    const pedidoId = orders[cancelIndex].idPedido;

    try {
      const response = await axios.delete('http://localhost:3000/pedidos/eliminar', {
        data: { idPedido: pedidoId },
      });

      if (response.status === 200) {
        const updatedPedidos = orders.filter((pedido) => pedido.idPedido !== pedidoId);
        setOrders(updatedPedidos);
        setCancelIndex(null);
        setNotification('Pedido cancelado con éxito');
      } else {
        setNotification('Error al cancelar el pedido. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al cancelar el pedido:', error);
      setNotification('Error al cancelar el pedido. Por favor, inténtelo de nuevo.');
    }
  };

  const handleCancelNo = () => {
    setCancelIndex(null);
  };

  const handleInputChange = (e, field, index) => {
    const updatedPedidos = [...orders];
    updatedPedidos[index][field] = e.target.value;
    setOrders(updatedPedidos);
  };

  const handleAddSaleClick = (index) => {
    const newSale = orders[index];
    setSales([...sales, newSale]);
    setNotification('Venta agregada con éxito');
  };

  const filteredPedidos = orders.filter(pedido => 
    `${pedido.nombreCliente} ${pedido.apellidoCliente}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pedidos-container">
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
      <header className="header">
        <button className="home" onClick={handleHomeClick}>
          <TiHome className="home-icon" />
          <span>Inicio</span>
        </button>
        <h1>Pedidos</h1>
        {mode === 'add-sale' && (
          <button className="back" onClick={handleBackClick}>
            <IoArrowBackCircle className="back-icon" />
            <span>Volver</span>
          </button>
        )}
      </header>
      <main className="main-content">
        {mode !== 'add-sale' && (
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
        )}
        <table className="tabla-pedidos">
          <thead>
            <tr>
              <th>Id Pedido</th>
              <th>Nombre Cliente</th>
              <th>Apellido Cliente</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Fecha de Pedido</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredPedidos.map((pedido, index) => (
              <tr key={pedido.idPedido}>
                <td>{pedido.idPedido}</td>
                <td>
                  {editIndex === index ? (
                    <input 
                      type="text" 
                      value={pedido.nombreCliente}
                      onChange={(e) => handleInputChange(e, 'nombreCliente', index)} 
                    />
                  ) : (
                    pedido.nombreCliente
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input 
                      type="text" 
                      value={pedido.apellidoCliente}
                      onChange={(e) => handleInputChange(e, 'apellidoCliente', index)} 
                    />
                  ) : (
                    pedido.apellidoCliente
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
                <td>
                  {editIndex === index ? (
                    <input 
                      type="text" 
                      value={pedido.estado}
                      onChange={(e) => handleInputChange(e, 'estado', index)} 
                    />
                  ) : (
                    pedido.estado
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input 
                      type="date" 
                      value={new Date(pedido.fechaPedido).toISOString().split('T')[0]} // Solo la fecha
                      onChange={(e) => handleInputChange(e, 'fechaPedido', index)} 
                    />
                  ) : (
                    pedido.fechaPedido
                  )}
                </td>
                <td className="action-buttons">
                  {mode === 'add-sale' ? (
                    <button className="action-button add" onClick={() => handleAddSaleClick(index)}>
                      <FaPlusCircle className="icon" />
                      <span className="text">Agregar</span>
                    </button>
                  ) : (
                    <>
                      <button className="action-button edit" onClick={() => handleEditClick(index)}>
                        <MdModeEdit className="icon" />
                        <span className="text">Modificar</span>
                      </button>
                      <button className="action-button cancel" onClick={() => handleCancelClick(index)}>
                        <TbBasketCancel className="icon" />
                        <span className="text">Eliminar</span>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editIndex !== null && (
          <button className="save-button" onClick={handleSaveClick}>
            Guardar Cambios
          </button>
        )}
        {cancelIndex !== null && (
          <div className="confirm-cancel">
            <p>¿Estás seguro de que deseas cancelar este pedido?</p>
            <button onClick={handleConfirmCancel}>Sí</button>
            <button onClick={handleCancelNo}>No</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Pedidos;




