import React, { useContext, useState } from 'react';
import { TiArrowBackOutline } from "react-icons/ti"; 
import { useNavigate, useLocation } from 'react-router-dom';
import './DescripcionProducto.css';
import logo from './Assets/logo.jpg';
import { OrderContext } from '../Context/OrderContext';

const DescripcionProducto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const { addOrder } = useContext(OrderContext);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleBackClick = () => {
    navigate('/Velasport'); 
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleOrderClick = () => {
    if (selectedSize) {
      addOrder({
        cliente: 'Cliente Anónimo',
        productName: product.name,
        size: selectedSize,
        cantidad: 1,
        precioUnitario: product.price,
        total: product.price,
        productImage: product.image
      });
      alert(`Has pedido el producto: ${product.name} - Talla: ${selectedSize}`);
    } else {
      alert('Por favor selecciona una talla antes de pedir.');
    }
  };

  if (!product) {
    return <div>No se ha encontrado el producto.</div>;
  }

  return (
    <div className="desc-detalle-container">
      <header className="desc-header">
        <button className="desc-back" onClick={handleBackClick}>
          <TiArrowBackOutline className="desc-back-icon" />
          <span>Volver</span>
        </button>
        <img src={logo} alt="Logo" className="desc-logo-DetallePro" />
      </header>
      <main className="desc-detalle-main">
        <div className="desc-product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="desc-product-details">
          <label>Articulo</label>
          <input type="text" value={product.name} readOnly />
          <label>Talla</label>
          <div className="desc-sizes">
            <button
              className={selectedSize === 'CH' ? 'desc-size-button selected' : 'desc-size-button'}
              onClick={() => handleSizeClick('CH')}
            >
              CH
            </button>
            <button
              className={selectedSize === 'M' ? 'desc-size-button selected' : 'desc-size-button'}
              onClick={() => handleSizeClick('M')}
            >
              M
            </button>
            <button
              className={selectedSize === 'G' ? 'desc-size-button selected' : 'desc-size-button'}
              onClick={() => handleSizeClick('G')}
            >
              G
            </button>
          </div>
          <label>Precio</label>
          <input type="text" value={product.price} readOnly />
          <button className="desc-order-button" onClick={handleOrderClick}>Pedir</button>
        </div>
      </main>
    </div>
  );
};

export default DescripcionProducto;
