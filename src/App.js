import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProductProvider } from './Components/Context/ProductContext'; // Importar el proveedor de contexto
import LoginForm from './Components/LoginForm/LoginForm';
import Home from './Components/Home/Home';
import VerProductos from './Components/VerProductos/VerProductos';
import AdministrarProductos from './Components/AdministrarProductos/AdministrarProductos';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar la sesión

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    return <Navigate to="/Login" replace />; // Redirige a la página de inicio de sesión
  };

  return (
    <Router>
      <ProductProvider> {/* Envolver la aplicación con ProductProvider */}
        <Routes>
          <Route path="/Login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/home" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/Login" replace />} />
          <Route path="/VerProductos" element={isLoggedIn ? <VerProductos /> : <Navigate to="/Login" replace />} />
          <Route path="/AdministrarProductos" element={isLoggedIn ? <AdministrarProductos /> : <Navigate to="/Login" replace />} />
          <Route path="*" element={<Navigate to="/Login" replace />} />
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
