import React, { useState, useContext } from 'react';
import './Ventas.css';
import { TiHome } from "react-icons/ti";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { ModeContext } from '../Context/ModeContext';
import { SalesContext } from '../Context/SalesContext'; 
import Notification from '../Pedidos/Notification'; 

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

  const handleAddSale = () => {
    setMode('add-sale');
    navigate('/pedidos');
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveClick = () => {
    setEditIndex(null);
    setNotification('Venta modificada con éxito');
  };

  const handleInputChange = (e, field, index) => {
    const updatedSales = [...sales];
    if (field === 'cantidad') {
      updatedSales[index][field] = parseInt(e.target.value);
      updatedSales[index].total = updatedSales[index].cantidad * updatedSales[index].precioUnitario;
    } else if (field === 'total') {
      updatedSales[index][field] = parseFloat(e.target.value);
    } else {
      updatedSales[index][field] = e.target.value;
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
                <th className="product-header">Productos</th>
                <th className="quantity-header">Cantidad</th>
                <th className="total-header">Total</th>
                <th className="action-header">Acción</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                      <input 
                        type="text" 
                        value={sale.productos}
                        onChange={(e) => handleInputChange(e, 'productos', index)} 
                      />
                    ) : (
                      sale.productos
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input 
                        type="number" 
                        value={sale.cantidad}
                        onChange={(e) => handleInputChange(e, 'cantidad', index)} 
                      />
                    ) : (
                      sale.cantidad
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input 
                        type="number" 
                        step="0.01"
                        value={sale.total}
                        onChange={(e) => handleInputChange(e, 'total', index)} 
                      />
                    ) : (
                      sale.total
                    )}
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
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Ventas;
