import React, { useState } from 'react';
import './LoginForm.css';
import { FaUserCircle, FaUser, FaLock } from "react-icons/fa";
import logo from './Assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Datos de usuario y contraseña correctos
    const validUsername = 'Velasport';
    const validPassword = 'Admin1234';

    if (username === validUsername && password === validPassword) {
      onLogin();      
      navigate('/home');
    } else {      
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-background">
      <div className="page">
        <div className="header">
          <img src={logo} alt="Logo" className="logo-loginform" />
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>       
            <h1 className="title">Inicie sesión por favor</h1>
            <FaUserCircle className='user' />
            <div className='input-box'>
              <input
                type="text"
                placeholder='Usuario'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                type="password"
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className='icon' />
            </div>
            <button type='submit'>Iniciar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
