import React, { useState, useEffect, useContext } from 'react';
import './Ventas.css';
import { TiHome } from "react-icons/ti";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { ModeContext } from '../Context/ModeContext';
import { SalesContext } from '../Context/SalesContext';
import Notification from '../Pedidos/Notification';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate('/home');

  return (
    <header className="header">
      <button className="home" onClick={goToHome}>
        <TiHome className="home-icon" />
        <span>Inicio</span>
      </button>
      <h1>Ventas</h1>
    </header>
  );
};

const Ventas = () => {
  const navigate = useNavigate();
  const { setMode } = useContext(ModeContext);
  const { sales, setSales } = useContext(SalesContext);
  const [editIndex, setEditIndex] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('https://velasportapi.integrador.xyz/ventas/');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setNotification('Error al cargar las ventas. Por favor, inténtelo de nuevo.');
      }
    };
    
    fetchSales();
  }, [setSales]);

  const handleAddSale = () => {
    setMode('add-sale');
    navigate('/pedidos');
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveClick = async () => {
    if (editIndex !== null) {
      const saleToUpdate = sales[editIndex];
      const { pedido_id, cantidad, fecha, total } = saleToUpdate;

      try {
        const response = await axios.put(`https://velasportapi.integrador.xyz/ventas/actualizar/${pedido_id}`, {
          pedido_id,
          cantidad,
          fecha,
          total
        });

        if (response.status === 200) {
          const updatedSales = [...sales];
          updatedSales[editIndex] = { ...saleToUpdate };
          setSales(updatedSales);
          setEditIndex(null);
          setNotification('Venta modificada con éxito');
        } else {
          setNotification('Error al modificar la venta. Por favor, inténtelo de nuevo.');
        }
      } catch (error) {
        console.error('Error al modificar la venta:', error);
        setNotification('Error al modificar la venta. Por favor, inténtelo de nuevo.');
      }
    }
  };

  const handleInputChange = (e, field, index) => {
    const updatedSales = [...sales];
    const value = e.target.value;

    if (field === 'cantidad') {
      updatedSales[index][field] = parseInt(value, 10);
      updatedSales[index].total = updatedSales[index].cantidad * updatedSales[index].precioUnitario;
    } else if (field === 'total') {
      updatedSales[index][field] = parseFloat(value);
    } else {
      updatedSales[index][field] = value;
    }
    setSales(updatedSales);
  };

  return (
    <div className="App">
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
      <Header />
      <main className="container">
        <div className="sales-table-container">
          <div className="add-sale" onClick={handleAddSale}>
            <FaPlusCircle className="add-icon" />
            <span>Agregar venta</span>
          </div>
          <table className="sales-table">
            <thead>
              <tr>
                <th className="order-id-header">ID Pedido</th>
                <th className="quantity-header">Cantidad</th>
                <th className="date-header">Fecha</th>
                <th className="total-header">Total</th>
                <th className="action-header">Acción</th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? (
                sales.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.pedido_id}</td>
                    <td>
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={sale.cantidad || ''}
                          onChange={(e) => handleInputChange(e, 'cantidad', index)}
                        />
                      ) : (
                        sale.cantidad
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          type="date"
                          value={sale.fecha || ''}
                          onChange={(e) => handleInputChange(e, 'fecha', index)}
                        />
                      ) : (
                        sale.fecha
                      )}
                    </td>
                    <td>
                      {sale.total !== null && sale.total !== undefined
                        ? Number(sale.total).toFixed(2)
                        : 'N/A'}
                    </td>
                    <td className="edit-action">
                      {editIndex === index ? (
                        <button className="action-button save" onClick={handleSaveClick}>
                          <CiBookmarkCheck className='save-icon' />
                          Guardar
                        </button>
                      ) : (
                        <button className="action-button edit" onClick={() => handleEditClick(index)}>
                          <FaEdit className="edit-icon" />
                          <span>Modificar</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay ventas registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Ventas;
