import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Balón de Fútbol', price: '10 USD', category: 'Fútbol', image: 'placeholder.png', description: 'Un balón de fútbol de alta calidad' },
    { id: 2, name: 'Camiseta de Fútbol', price: '15 USD', category: 'Fútbol', image: 'placeholder.png', description: 'Camiseta oficial del equipo de fútbol' },
    { id: 3, name: 'Balón de Basquetbol', price: '12 USD', category: 'Basquetbol', image: 'placeholder.png', description: 'Balón de basquetbol profesional' },
    { id: 4, name: 'Camiseta de Basquetbol', price: '20 USD', category: 'Basquetbol', image: 'placeholder.png', description: 'Camiseta oficial del equipo de basquetbol' },
    { id: 5, name: 'Balón de Voleibol', price: '10 USD', category: 'Voleibol', image: 'placeholder.png', description: 'Balón de voleibol resistente' },
    { id: 6, name: 'Rodilleras de Voleibol', price: '8 USD', category: 'Voleibol', image: 'placeholder.png', description: 'Rodilleras de alta calidad para voleibol' },
    { id: 7, name: 'Gorra', price: '5 USD', category: 'Accesorios', image: 'placeholder.png', description: 'Gorra deportiva' },
    { id: 8, name: 'Mochila', price: '25 USD', category: 'Accesorios', image: 'placeholder.png', description: 'Mochila espaciosa y duradera' },
  ]);

  const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada

  const addProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const updateSelectedImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, selectedImage, updateSelectedImage }}>
      {children}
    </ProductContext.Provider>
  );
};
