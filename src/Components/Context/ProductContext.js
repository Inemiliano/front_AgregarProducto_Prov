import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Balón de Fútbol', price: '10 USD', category: 'Fútbol', image: 'placeholder.png' },
    { id: 2, name: 'Camiseta de Fútbol', price: '15 USD', category: 'Fútbol', image: 'placeholder.png' },
    { id: 3, name: 'Balón de Basquetbol', price: '12 USD', category: 'Basquetbol', image: 'placeholder.png' },
    { id: 4, name: 'Camiseta de Basquetbol', price: '20 USD', category: 'Basquetbol', image: 'placeholder.png' },
    { id: 5, name: 'Balón de Voleibol', price: '10 USD', category: 'Voleibol', image: 'placeholder.png' },
    { id: 6, name: 'Rodilleras de Voleibol', price: '8 USD', category: 'Voleibol', image: 'placeholder.png' },
    { id: 7, name: 'Gorra', price: '5 USD', category: 'Accesorios', image: 'placeholder.png' },
    { id: 8, name: 'Mochila', price: '25 USD', category: 'Accesorios', image: 'placeholder.png' },
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
