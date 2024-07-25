//ok
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './AdministrarProductos.css';
import { ProductContext } from '../Context/ProductContext'; // Asegúrate de que esta ruta sea correcta
import { TiHome } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const Header = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate('/home');

  return (
    <header className="header">
      <button className="home" onClick={goToHome}>
        <TiHome className="home-icon" />
        <span>Inicio</span>
      </button>
      <h1>Panel de Administración</h1>
    </header>
  );
};

const ProductForm = ({ onProductAdded }) => {
  const { addProduct } = useContext(ProductContext);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming the backend returns the image URL or relevant info
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productImage || !productCategory || !productDescription) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const imageUrl = await handleImageUpload(productImage);
    if (!imageUrl) return; // Handle error if image upload failed

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: parseFloat(productPrice),
      image: imageUrl,
      category: productCategory,
      description: productDescription
    };

    addProduct(newProduct);
    onProductAdded();
    setProductName('');
    setProductPrice('');
    setProductImage(null);
    setProductCategory('');
    setProductDescription('');
  };

  return (
    <form id="addProductForm" onSubmit={handleSubmit}>
      <input
        type="text"
        id="adminProductName"
        placeholder="Nombre del producto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <input
        type="number"
        id="adminProductPrice"
        placeholder="Precio del producto"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        required
      />
      <select
        id="adminProductCategory"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        required
      >
        <option value="">Selecciona una categoría</option>
        <option value="Fútbol">Fútbol</option>
        <option value="Basquetbol">Basquetbol</option>
        <option value="Voleibol">Voleibol</option>
        <option value="Accesorios">Accesorios</option>
      </select>
      <textarea
        id="adminProductDescription"
        className="fixed-size-textarea"
        placeholder="Descripción del producto"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        required
      />
      <input
        type="file"
        id="adminProductImage"
        accept="image/*"
        onChange={(e) => setProductImage(e.target.files[0])}
        required
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

const ProductListAdmin = ({ products, onProductDeleted }) => {
  const { deleteProduct } = useContext(ProductContext);

  return (
    <div id="productListAdmin">
      {products.map((product) => (
        <div key={product.id} className="product-admin">
          <div className="product-info-Ad">
            <span>{product.name}</span>
            <img src={product.image} alt={product.name} />
          </div>
          <button className="delete-button" onClick={() => { deleteProduct(product.id); onProductDeleted(); }}>
            <MdCancel className="delete-icon" />
            <span className="text">Eliminar</span>
          </button>
        </div>
      ))}
    </div>
  );
};

const AdminPanel = () => {
  const { products } = useContext(ProductContext);
  const [showDeleteSection, setShowDeleteSection] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleProductAdded = () => {
    setNotification('Producto agregado correctamente');
  };

  const handleProductDeleted = () => {
    setNotification('Producto eliminado correctamente');
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <div className="section-container">
          <h2>Agregar un nuevo producto</h2>
          <ProductForm onProductAdded={handleProductAdded} />
        </div>
        <div className="section-container">
          <label>
            <span>Habilitar eliminación de productos</span>
            <label className="switch">
              <input type="checkbox" checked={showDeleteSection} onChange={() => setShowDeleteSection(!showDeleteSection)} />
              <span className="slider"></span>
            </label>
          </label>
          {showDeleteSection && (
            <>
              <h2>Eliminar Productos</h2>
              <ProductListAdmin products={products} onProductDeleted={handleProductDeleted} />
            </>
          )}
        </div>
        {notification && (
          <Notification message={notification} onClose={() => setNotification(null)} />
        )}
      </main>
    </div>
  );
};

export default AdminPanel;


