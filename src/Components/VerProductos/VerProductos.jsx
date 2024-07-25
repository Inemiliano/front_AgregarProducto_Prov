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

const ProductCard = ({ product, onOrderClick }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/DetalleProducto', { state: { product } });
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
  const { products } = useContext(ProductContext);
  const { addOrder } = useContext(OrderContext);
  const [selectedCategory, setSelectedCategory] = useState('Fútbol');

  const filterCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderClick = (product) => {
    const nombreCliente = prompt('Ingrese su nombre');
    const apellidoCliente = prompt('Ingrese su apellido');
    const cantidad = parseInt(prompt('Ingrese la cantidad'), 10);
    const fechaPedido = prompt('Ingrese la fecha del pedido (YYYY-MM-DD)');
    const estado = 'pendiente';

    if (!nombreCliente || !apellidoCliente || isNaN(cantidad) || !fechaPedido) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    addOrder({
      cliente: `${nombreCliente} ${apellidoCliente}`,
      productos: product.name,
      cantidad,
      total: product.price * cantidad,
      fechaPedido,
      estado
    });

    alert(`Has pedido el producto: ${product.name}`);
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



