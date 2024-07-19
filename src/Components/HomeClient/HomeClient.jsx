import React, { useContext, useState } from 'react';
import './HomeClient.css';
import logo from './Assets/logo.jpg';
import { BiLogOut } from "react-icons/bi"; 
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';
import { OrderContext } from '../Context/OrderContext';

const ClientHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/Inicia-Sesion'); 
  };

  return (
    <header className="client-header-home">
      <div className="client-header-left-home">
        <img src={logo} alt="Logo" className="client-logo-home" />
      </div>
      <div className="client-header-right-home">
        <button className="client-logout" onClick={handleLogout}>
          <BiLogOut className="client-logout-icon" /> 
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
};

const ClientNavBar = ({ filterCategory, selectedCategory }) => {
  const navigate = useNavigate();

  const handleNavClick = (category) => {
    if (category === 'Mis pedidos') {
      navigate('/Mispedidos');
    } else {
      filterCategory(category);
    }
  };

  return (
    <nav className="client-navbar">
      <div className="client-nav-tabs">
        <button onClick={() => handleNavClick('Fútbol')} className={selectedCategory === 'Fútbol' ? 'client-active' : ''}>Fútbol</button>
        <button onClick={() => handleNavClick('Basquetbol')} className={selectedCategory === 'Basquetbol' ? 'client-active' : ''}>Basquetbol</button>
        <button onClick={() => handleNavClick('Voleibol')} className={selectedCategory === 'Voleibol' ? 'client-active' : ''}>Voleibol</button>
        <button onClick={() => handleNavClick('Accesorios')} className={selectedCategory === 'Accesorios' ? 'client-active' : ''}>Accesorios</button>
        <button onClick={() => handleNavClick('Mis pedidos')} className={selectedCategory === 'Mis pedidos' ? 'client-active' : ''}>Mis pedidos</button>
      </div>
    </nav>
  );
};

const ClientProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addOrder } = useContext(OrderContext);

  const handleViewClick = () => {
    navigate('/Descripcion', { state: { product } });
  };

  const handleOrderClick = () => {
    addOrder({
      cliente: 'Cliente Anónimo',
      productos: product.name,
      cantidad: 1, // Asumimos que se pide una unidad
      total: product.price
    });
    alert(`Has pedido el producto: ${product.name}`);
  };

  return (
    <div className="client-product-card">
      <div className="client-product-image">
        <img src={product.image || "placeholder.png"} alt={product.name} />
      </div>
      <div className="client-product-info">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <div className="client-product-buttons">
          <button className="client-btn-view" onClick={handleViewClick}>Ver</button>
          <button className="client-btn-order" onClick={handleOrderClick}>Pedir</button>
        </div>
      </div>
    </div>
  );
};

const ClientProductList = ({ products }) => (
  <div className="client-product-list">
    {products.map(product => (
      <ClientProductCard key={product.id} product={product} />
    ))}
  </div>
);

const HomeClient = () => {
  const { products } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('Fútbol');

  const filterCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <div className="client-home-page">
      <ClientHeader />
      <ClientNavBar filterCategory={filterCategory} selectedCategory={selectedCategory} />
      <ClientProductList products={filteredProducts} />
    </div>
  );
};

export default HomeClient;
