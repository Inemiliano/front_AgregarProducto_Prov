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
      const formattedFechaPedido = isNaN(parsedFechaPedido.getTime()) ? new Date().toISOString().split('T')[0] : parsedFechaPedido.toISOString().split('T')[0];

      // Verifica que cantidad y precio sean números válidos
      const cantidadNum = parseFloat(cantidad);
      const precioNum = parseFloat(precio);
      const total = (!isNaN(cantidadNum) && !isNaN(precioNum)) ? (cantidadNum * precioNum).toFixed(2) : '0.00';

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
    if (!pedido || !pedido.idPedido || !pedido.cantidad || !pedido.fechaPedido || !pedido.total) {
      console.error('Datos incompletos del pedido:', pedido);
      setNotification('Error al agregar la venta. Datos del pedido incompletos.');
      return;
    }

    const newVenta = {
      pedido_id: pedido.idPedido,
      cantidad: parseInt(pedido.cantidad, 10),
      fecha: new Date(pedido.fechaPedido).toISOString().split('T')[0], // Solo la fecha
      total: parseFloat(pedido.total).toFixed(2) // Asegúrate de que sea un número
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

    if (field === 'cantidad' || field === 'precio') {
      // Recalcular el total si cambia cantidad o precio
      const cantidad = parseFloat(updatedPedidos[index].cantidad) || 0;
      const precio = parseFloat(updatedPedidos[index].precio) || 0;
      updatedPedidos[index].total = (cantidad * precio).toFixed(2);
    }

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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPedidos.length > 0 ? (
              filteredPedidos.map((pedido, index) => (
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
                        value={pedido.fechaPedido} 
                        onChange={(e) => handleInputChange(e, 'fechaPedido', index)} 
                      />
                    ) : (
                      pedido.fechaPedido
                    )}
                  </td>
                  <td>{pedido.total}</td>
                  <td>
                    {editIndex === index ? (
                      <>
                        <button onClick={handleSaveClick}>Guardar</button>
                        <button onClick={() => setEditIndex(null)}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(index)}><MdModeEdit /></button>
                        <button onClick={() => handleCancelClick(index)}><TbBasketCancel /></button>
                        <button onClick={() => handleAddSaleClick(index)}>Agregar Venta</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay pedidos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      {cancelIndex !== null && (
        <div className="confirmation-dialog">
          <p>¿Estás seguro de que deseas cancelar este pedido?</p>
          <button onClick={handleConfirmCancel}>Sí</button>
          <button onClick={handleCancelNo}>No</button>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
