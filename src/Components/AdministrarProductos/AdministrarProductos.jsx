import React, { useState, useEffect } from 'react';
import './AdministrarProductos.css';
import logo from './Assets/logo.jpg';
import { TiHome } from "react-icons/ti";


const Header = () => (
  <header id="header">
    <h1>Panel de Administración</h1>
    <div className="header-left">
      <button className="home">
        <TiHome className="home-icon" />         
        <span>Inicio</span>
      </button>
      <img src={logo} alt="Logo" className="logo" />
    </div>
  </header>
);

const ProductForm = ({ addProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productImage || !productCategory) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      const newProduct = {
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice),
        image: imageUrl,
        category: productCategory,
      };
      addProduct(newProduct);
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setProductCategory('');
    };
    reader.readAsDataURL(productImage);
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

const ProductListAdmin = ({ products, deleteProduct }) => (
  <div id="productListAdmin">
    {products.map((product) => (
      <div key={product.id} className="product-admin">
        <span>{product.name}</span>
        <img src={product.image} alt={product.name} />
        <button className="delete-button" onClick={() => deleteProduct(product.id)}>Eliminar</button>
      </div>
    ))}
  </div>
);

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const saveProductsToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
  };

  const deleteProduct = (productId) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar este producto?`);
    if (confirmDelete) {
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
      saveProductsToLocalStorage(updatedProducts);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <h2>Agregar Nuevo Producto</h2>
        <ProductForm addProduct={addProduct} />
        <h2>Eliminar Productos</h2>
        <ProductListAdmin products={products} deleteProduct={deleteProduct} />
      </main>
    </div>
  );
};

export default AdminPanel;
