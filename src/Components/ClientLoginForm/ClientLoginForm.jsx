import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de haber instalado axios
import './ClientLoginForm.css';
import { FaUserCircle, FaUser, FaLock } from "react-icons/fa";
import clientLogo from './Assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const ClientLoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/usersJWT/login', {
        email: username,
        pass: password,
      });

      const { token, rol_id } = response.data;
      
      // Realiza acciones adicionales si es necesario
      console.log('Token recibido:', token);
      console.log('Rol ID:', rol_id);

      onLogin();
      navigate('/Velasport');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="client-login-background">
      <div className="client-page">
        <div className="client-header">
          <img src={clientLogo} alt="Client Logo" className="client-logo-loginform" />
        </div>
        <div className="client-wrapper">
          <form onSubmit={handleSubmit}>
            <h1 className="client-title">Inicie sesión por favor</h1>
            <FaUserCircle className='client-user' />
            <div className='client-input-box'>
              <input
                type="text"
                placeholder='Usuario'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className='client-icon' />
            </div>
            <div className='client-input-box'>
              <input
                type="password"
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className='client-icon' />
            </div>
            <button type='submit' className='client-submit-button'>Iniciar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="client-register-link">
              <p>¿No tienes cuenta? <a href="/Registro">Crear cuenta</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientLoginForm;

