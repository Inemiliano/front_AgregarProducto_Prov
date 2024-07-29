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
        const response = await axios.get('http://localhost:4000/pedidos/');
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
      const { idPedido, nombreCliente, apellidoCliente, estado, cantidad, fechaPedido, precio } = pedidoToUpdate;

      // Asegurarse de que fechaPedido es una fecha válida
      const parsedFechaPedido = new Date(fechaPedido);
      const formattedFechaPedido = isNaN(parsedFechaPedido.getTime()) ? new Date().toISOString().split('T')[0] : parsedFechaPedido.toISOString().split('T')[0]; // '2024-07-18'

      const total = Number(cantidad) * Number(precio); // Recalcular el total y asegurarse de que es un número

      try {
        const response = await axios.put(`http://localhost:4000/pedidos/actualizar/${idPedido}`, {
          nombreCliente,
          apellidoCliente,
          estado,
          cantidad,
          fechaPedido: formattedFechaPedido,
          total
        });

        if (response.status === 200) {
          // Actualiza la lista de pedidos con los cambios
          const updatedPedidos = [...orders];
          updatedPedidos[editIndex] = { ...pedidoToUpdate, fechaPedido: formattedFechaPedido, total };
          setOrders(updatedPedidos);

          // Automatizar la creación de una venta si el estado es "pagado"
          if (estado.toLowerCase() === 'pagado') {
            await agregarVenta(updatedPedidos[editIndex]);
          }

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

  const agregarVenta = async (pedido) => {
    const newVenta = {
      pedido_id: pedido.idPedido,
      cantidad: pedido.cantidad,
      fecha: new Date(pedido.fechaPedido).toISOString().split('T')[0], // Solo la fecha
      total: pedido.total
    };

    console.log('Datos de la nueva venta:', newVenta);

    try {
      const response = await axios.post('http://localhost:4000/ventas/agregar', newVenta, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setSales([...sales, newVenta]);
        setNotification('Venta agregada con éxito');
      } else {
        setNotification('Error al agregar la venta. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error al agregar la venta:', error.response.data);
      } else {
        console.error('Error al agregar la venta:', error.message);
      }
      setNotification('Error al agregar la venta. Por favor, inténtelo de nuevo.');
    }
  };

  const handleCancelClick = (index) => {
    setCancelIndex(index);
  };

  const handleConfirmCancel = async () => {
    const pedidoId = orders[cancelIndex].idPedido;

    try {
      const response = await axios.delete('http://localhost:4000/pedidos/eliminar', {
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
              placeholder="Buscar cliente..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button onClick={handleSearchClick}>
              <IoMdSearch className="search-icon" />
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
              <th>Total</th> {/* Nueva columna para el total */}
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredPedidos.map((pedido, index) => {
              // Verificar que fechaPedido sea una fecha válida
              const parsedFechaPedido = new Date(pedido.fechaPedido);
              const displayFechaPedido = isNaN(parsedFechaPedido.getTime()) 
                ? '' 
                : parsedFechaPedido.toISOString().split('T')[0];

              return (
                <tr key={pedido.idPedido}>
                  <td>{pedido.idPedido}</td>
                  <td>{pedido.nombreCliente}</td>
                  <td>{pedido.apellidoCliente}</td>
                  <td>
                    {editIndex === index
                      ? <input type="number" value={pedido.cantidad} onChange={(e) => handleInputChange(e, 'cantidad', index)} />
                      : pedido.cantidad}
                  </td>
                  <td>
                    {editIndex === index
                      ? <select value={pedido.estado} onChange={(e) => handleInputChange(e, 'estado', index)}>
                          <option value="pendiente">Pendiente</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      : pedido.estado}
                  </td>
                  <td>
                    {editIndex === index
                      ? <input type="date" value={displayFechaPedido} onChange={(e) => handleInputChange(e, 'fechaPedido', index)} />
                      : displayFechaPedido}
                  </td>
                  <td>
                    {(Number(pedido.total) || 0).toFixed(2)}
                  </td>
                  <td>
                    {editIndex === index
                      ? <button onClick={handleSaveClick}>Guardar</button>
                      : <>
                          <button onClick={() => handleEditClick(index)}>
                            <MdModeEdit className="edit-icon" />
                          </button>
                          <button onClick={() => handleCancelClick(index)}>
                            <TbBasketCancel className="cancel-icon" />
                          </button>
                          <button onClick={() => handleAddSaleClick(index)}>
                            <FaPlusCircle className="add-sale-icon" />
                          </button>
                        </>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {cancelIndex !== null && (
          <div className="cancel-confirmation">
            <p>¿Estás seguro de que quieres cancelar el pedido?</p>
            <button onClick={handleConfirmCancel}>Sí</button>
            <button onClick={handleCancelNo}>No</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Pedidos;
//casi
