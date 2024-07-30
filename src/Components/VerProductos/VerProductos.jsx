import React, { useContext, useState } from 'react';
import './VerProductos.css';
import logo from './Assets/logo.jpg';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';

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
    </div>
  </nav>
);

const ProductCard = ({ product, onOrderClick }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/DetalleProducto', { state: { product } });
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <div className="product-buttons">
          <button className="btn-view" onClick={handleViewClick}>Ver</button>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products, onOrderClick }) => (
  <div className="product-list">
    {products.map(product => (
      <ProductCard key={product.id} product={product} onOrderClick={onOrderClick} />
    ))}
  </div>
);

const VerProductos = () => {
  const { products, addProduct } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('Fútbol');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: 'Fútbol' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      addProduct(newProduct);
      setNewProduct({ name: '', price: '', image: '', category: selectedCategory });
    } else {
      alert('Please fill in all fields');
    }
  };

  const filterCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderClick = (product) => {
    alert(`Ordered: ${product.name}`);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <div className="ver-productos">
      <Header />
      <NavBar filterCategory={filterCategory} selectedCategory={selectedCategory} />
      <ProductList products={filteredProducts} onOrderClick={handleOrderClick} />

    </div>
  );
};

export default VerProductos;
