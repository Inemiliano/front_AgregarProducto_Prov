import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProductProvider } from './Components/Context/ProductContext';
import { OrderProvider } from './Components/Context/OrderContext';
import { ModeProvider } from './Components/Context/ModeContext';
import { SalesProvider } from './Components/Context/SalesContext'; 
import LoginForm from './Components/LoginForm/LoginForm';
import Home from './Components/Home/Home';
import VerProductos from './Components/VerProductos/VerProductos';
import AdministrarProductos from './Components/AdministrarProductos/AdministrarProductos';
import DetalleProducto from './Components/DetallesProducto/DetalleProducto';
import Pedidos from './Components/Pedidos/Pedidos';
import Ventas from './Components/Ventas/Ventas';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    return <Navigate to="/Login" replace />;
  };

  return (
    <Router>
      <OrderProvider> 
        <ProductProvider>
          <ModeProvider>
            <SalesProvider>
              <Routes>
                <Route path="/Login" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/Home" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/Login" replace />} />
                <Route path="/VerProductos" element={isLoggedIn ? <VerProductos /> : <Navigate to="/Login" replace />} />
                <Route path="/AdministrarProductos" element={isLoggedIn ? <AdministrarProductos /> : <Navigate to="/Login" replace />} />
                <Route path="/DetalleProducto" element={isLoggedIn ? <DetalleProducto /> : <Navigate to="/Login" replace />} />
                <Route path="/VerPedidos" element={isLoggedIn ? <Pedidos /> : <Navigate to="/Login" replace />} />
                <Route path="/Pedidos" element={isLoggedIn ? <Pedidos /> : <Navigate to="/Login" replace />} /> 
                <Route path="/VerVentas" element={isLoggedIn ? <Ventas /> : <Navigate to="/Login" replace />} />
                <Route path="*" element={<Navigate to="/Login" replace />} />
              </Routes>
            </SalesProvider>
          </ModeProvider>
        </ProductProvider>
      </OrderProvider>
    </Router>
  );
}

export default App;
