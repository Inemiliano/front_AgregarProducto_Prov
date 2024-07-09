import React, { useContext, useState } from 'react';
import './VerProductos.css';
import logo from './Assets/logo.jpg';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext'; // Importar el contexto

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

  const handleViewClick = () => {
    navigate('/DetalleProducto', { state: { product } });
  };

  const handleOrderClick = () => {
    // Implementa la funcionalidad del botón "Pedir"
    alert(`Has pedido el producto: ${product.name}`);
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
  const { products } = useContext(ProductContext); // Consumir el contexto de productos

  // Establecer estado local para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('Fútbol');

  // Función para filtrar productos por categoría
  const filterCategory = (category) => {
    setSelectedCategory(category);
    // Lógica de filtrado de productos por categoría (a implementar según necesidad)
  };

  // Filtrar productos según la categoría seleccionada
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
