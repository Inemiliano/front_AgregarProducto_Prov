import React, { useContext, useState } from 'react';
import './VerProductos.css';
import logo from './Assets/logo.jpg';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';
import { OrderContext } from '../Context/OrderContext';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/home');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="home" onClick={handleNavigateHome}>
          <TiHome className="home-icon" />
          <span>Inicio</span>
        </button>
        <img src={logo} alt="Logo" className="logo-verproductos" />
      </div>
    </header>
  );
};

const NavBar = ({ filterCategory, selectedCategory }) => (
  <nav className="navbar">
    <div className="nav-tabs">
      <button onClick={() => filterCategory('Fútbol')} className={selectedCategory === 'Fútbol' ? 'active' : ''}>Fútbol</button>
      <button onClick={() => filterCategory('Basquetbol')} className={selectedCategory === 'Basquetbol' ? 'active' : ''}>Basquetbol</button>
      <button onClick={() => filterCategory('Voleibol')} className={selectedCategory === 'Voleibol' ? 'active' : ''}>Voleibol</button>
      <button onClick={() => filterCategory('Accesorios')} className={selectedCategory === 'Accesorios' ? 'active' : ''}>Accesorios</button>
    </div>
  </nav>
);

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addOrder } = useContext(OrderContext);
  const [customerName, setCustomerName] = useState('');

  const handleViewClick = () => {
    navigate('/DetalleProducto', { state: { product } });
  };

  const handleOrderClick = () => {
    const name = prompt("Por favor ingresa el nombre y apellido:");
    if (name) {
      setCustomerName(name);
      addOrder({
        cliente: name,
        productos: product.name,
        cantidad: 1, // Asumimos que se pide una unidad
        total: product.price
      });
      alert(`Has pedido el producto: ${product.name}`);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || "placeholder.png"} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <div className="product-buttons">
          <button className="btn-view" onClick={handleViewClick}>Ver</button>
          <button className="btn-order" onClick={handleOrderClick}>Pedir</button>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products }) => (
  <div className="product-list">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

const VerProductos = () => {
  const { products } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('Fútbol');

  const filterCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <div className="ver-productos">
      <Header />
      <NavBar filterCategory={filterCategory} selectedCategory={selectedCategory} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default VerProductos;
