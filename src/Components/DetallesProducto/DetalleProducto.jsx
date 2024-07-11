import React, { useContext, useState } from 'react';
import { TiHome } from "react-icons/ti";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import './DetalleProducto.css';
import logo from './Assets/logo.jpg';
import { OrderContext } from '../Context/OrderContext';

const DetalleProducto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const { addOrder } = useContext(OrderContext);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleHomeClick = () => {
    navigate('/home'); 
  };

  const handleBackClick = () => {
    navigate('/VerProductos'); 
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleOrderClick = () => {
    const name = prompt("Por favor ingresa nombre y apellido:");
    if (name) {
      addOrder({
        cliente: name,
        productos: `${product.name} - Talla: ${selectedSize}`,
        cantidad: 1,
        total: product.price
      });
      alert(`Has pedido el producto: ${product.name} - Talla: ${selectedSize}`);
    }
  };

  if (!product) {
    return <div>No se ha encontrado el producto.</div>;
  }

  return (
    <div className="detalle-container">
      <header className="header">
        <button className="home" onClick={handleHomeClick}>
          <TiHome className="home-icon" />
          <span>Inicio</span>
        </button>
        <img src={logo} alt="Logo" className="logo-DetallePro" />
        <button className="back" onClick={handleBackClick}>
          <IoArrowBackCircle className="back-icon" />
          <span>Volver</span>
        </button>
      </header>
      <main className="detalle-main">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-details">
          <label>Articulo</label>
          <input type="text" value={product.name} readOnly />
          <label>Talla</label>
          <div className="sizes">
            <button
              className={selectedSize === 'CH' ? 'size-button selected' : 'size-button'}
              onClick={() => handleSizeClick('CH')}
            >
              CH
            </button>
            <button
              className={selectedSize === 'M' ? 'size-button selected' : 'size-button'}
              onClick={() => handleSizeClick('M')}
            >
              M
            </button>
            <button
              className={selectedSize === 'G' ? 'size-button selected' : 'size-button'}
              onClick={() => handleSizeClick('G')}
            >
              G
            </button>
          </div>
          <label>Precio</label>
          <input type="text" value={product.price} readOnly />
          <button className="order-button" onClick={handleOrderClick}>Pedir</button>
        </div>
      </main>
    </div>
  );
};

export default DetalleProducto;
