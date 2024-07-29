import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    useEffect(() => {
        if (!products.length) {
            fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/products');
            const productsWithEncodedUrls = response.data.map(product => ({
                ...product,
                image: `http://localhost:4000/uploads/${encodeURIComponent(product.image)}`
            }));
            setProducts(productsWithEncodedUrls);
            localStorage.setItem('products', JSON.stringify(productsWithEncodedUrls));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addProduct = (newProduct) => {
        const newProducts = [...products, {
            ...newProduct,
            image: `http://localhost:4000/uploads/${encodeURIComponent(newProduct.image)}`
        }];
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    const deleteProduct = (id) => {
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
//medio ok