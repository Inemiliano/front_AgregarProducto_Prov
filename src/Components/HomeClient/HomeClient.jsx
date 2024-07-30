import React, { useContext, useState } from 'react';
import './HomeClient.css';
import logo from './Assets/logo.jpg';
import { BiLogOut } from "react-icons/bi"; 
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';
import Modal from './modal'; // Importa el componente del modal
import axios from 'axios'; // Importar axios para manejar pedidos

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
        <button onClick={() => handleNavClick('Mis pedidos')} className={selectedCategory === 'Mis pedidos' ? 'client-active' : ''}>Mis pedidos</button>
      </div>
    </nav>
  );
};

const ClientProductCard = ({ product, onOrderClick }) => {
  const navigate = useNavigate();
  
  const price = parseFloat(product.price); // Asegúrate de que el campo sea "price" y no "precio"
  const formattedPrice = price ? price.toFixed(2) : "0.00";

  const handleViewClick = () => {
    navigate('/Descripcion', { state: { product } });
  };

  return (
    <div className="client-product-card">
      <div className="client-product-image">
        <img src={product.image || "placeholder.png"} alt={product.name} /> {/* Asegúrate de que los nombres de los campos sean correctos */}
      </div>
      <div className="client-product-info">
        <h3>{product.name}</h3>
        <p>${formattedPrice}</p>
        <div className="client-product-buttons">
          <button className="client-btn-view" onClick={handleViewClick}>Ver</button>
          <button className="client-btn-order" onClick={() => onOrderClick(product)}>Pedir</button>
        </div>
      </div>
    </div>
  );
};

const ClientProductList = ({ products, onOrderClick }) => (
  <div className="client-product-list">
    {products.map(product => (
      <ClientProductCard key={product.id} product={product} onOrderClick={onOrderClick} />
    ))}
  </div>
);

const HomeClient = () => {
  const { products } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('Fútbol');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filterCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleModalSubmit = async (orderData) => {
    console.log(orderData)
    /* try {
      const response = await axios.post('http://localhost:4000/pedidos/agregar', orderData);
      console.log('Order successfully sent:', response.data);

      alert('Pedido agregado correctamente.');
      // Actualiza el contexto de pedidos si es necesario
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error sending order:', error);
      alert('Hubo un error al agregar el pedido. Por favor, intenta de nuevo.');
    } */
   setIsModalOpen(false);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <div className="client-home-page">
      <ClientHeader />
      <ClientNavBar filterCategory={filterCategory} selectedCategory={selectedCategory} />
      <ClientProductList products={filteredProducts} onOrderClick={handleOrderClick} />
      {isModalOpen && 
        <Modal 
          show={isModalOpen} 
          onClose={handleModalClose} 
          onSubmit={handleModalSubmit}
          product={selectedProduct} // Pasa el producto al modal
        />
      }
    </div>
  );
};

export default HomeClient;
