import React, { useState } from 'react';
import './VerProductos.css'; 
import logo from './Assets/logo.jpg';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

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

const ProductCard = ({ name, price }) => (
  <div className="product-card">
    <div className="product-image">
      <img src="placeholder.png" alt={name} />
    </div>
    <div className="product-info">
      <h3>{name}</h3>
      <p>{price}</p>
      <div className="product-buttons">
        <button className="btn-view">Ver</button>
        <button className="btn-order">Pedir</button>
      </div>
    </div>
  </div>
);

const ProductList = ({ products }) => (
  <div className="product-list">
    {products.map(product => (
      <ProductCard key={product.id} name={product.name} price={product.price} />
    ))}
  </div>
);

const VerProductos = () => {
  const allProducts = [
    { id: 1, name: 'Balón de Fútbol', price: '10 USD', category: 'Fútbol' },
    { id: 2, name: 'Camiseta de Fútbol', price: '15 USD', category: 'Fútbol' },
    { id: 3, name: 'Balón de Basquetbol', price: '12 USD', category: 'Basquetbol' },
    { id: 4, name: 'Camiseta de Basquetbol', price: '20 USD', category: 'Basquetbol' },
    { id: 5, name: 'Balón de Voleibol', price: '10 USD', category: 'Voleibol' },
    { id: 6, name: 'Rodilleras de Voleibol', price: '8 USD', category: 'Voleibol' },
    { id: 7, name: 'Gorra', price: '5 USD', category: 'Accesorios' },
    { id: 8, name: 'Mochila', price: '25 USD', category: 'Accesorios' },
  ];

  const [products, setProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState('Fútbol');

  const filterCategory = (category) => {
    setSelectedCategory(category);
    setProducts(allProducts.filter(product => product.category === category));
  };

  return (
    <div className="VerProductos">
      <Header />
      <NavBar filterCategory={filterCategory} selectedCategory={selectedCategory} />
      <ProductList products={products} />
    </div>
  );
};

export default VerProductos;
