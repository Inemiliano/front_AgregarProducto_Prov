import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import Home from './Components/Home/Home';
import VerProductos from './Components/VerProductos/VerProductos'
import AdministrarProductos from './Components/AdministrarProductos/AdministrarProductos'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
