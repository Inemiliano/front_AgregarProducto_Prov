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
      <button onClick={() => filterCategory('Accesorios')} className={selectedCategory === 'Accesorios' ? 'active' : ''}>Accesorios</button>
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
          <button className="btn-order" onClick={() => onOrderClick(product)}>Pedir</button>
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
      <div className="add-product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Product Price"
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
          placeholder="Product Image URL"
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default VerProductos;
