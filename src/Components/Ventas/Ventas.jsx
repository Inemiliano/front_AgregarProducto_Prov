import React, { useContext } from 'react';
import './Ventas.css';
import { TiHome } from "react-icons/ti";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ModeContext } from '../Context/ModeContext'; 

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
  const { setMode } = useContext(ModeContext); // Obtener el método para configurar el modo

  const handleAddSale = () => {
    setMode('add-sale'); // Configurar el modo en el contexto
    navigate('/pedidos'); // Redirigir a la página de Pedidos
  };

  return (
    <div className="App">
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
              {/* Aquí se mapearán las ventas */}
              <tr>
                <td>Tachones de futbol</td>
                <td>1</td>
                <td>$1500</td>
                <td className="edit-action">
                  <FaEdit className="edit-icon" />
                  <span>Modificar</span>
                </td>
              </tr>
              <tr>
                <td>Playera BayernLV</td>
                <td>5</td>
                <td>$1700</td>
                <td className="edit-action">
                  <FaEdit className="edit-icon" />
                  <span>Modificar</span>
                </td>
              </tr>
              <tr>
                <td>Mangas Nike</td>
                <td>2</td>
                <td>$100</td>
                <td className="edit-action">
                  <FaEdit className="edit-icon" />
                  <span>Modificar</span>
                </td>
              </tr>
              <tr>
                <td>Short Wilson</td>
                <td>1</td>
                <td>$500</td>
                <td className="edit-action">
                  <FaEdit className="edit-icon" />
                  <span>Modificar</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Ventas;
