import React, { useState } from 'react';
import './RegistroUser.css';
import { FaUserCircle, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import clientLogo from './Assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const RegistroUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Guardar los datos del usuario en localStorage
    const userData = { email, password };
    localStorage.setItem('userData', JSON.stringify(userData));

    setSuccess('Su cuenta se creó correctamente');
    setError('');

    // Redirigir al usuario a la página de inicio de sesión después de 2 segundos
    setTimeout(() => {
      navigate('/Inicia-Sesion');
    }, 3000);
  };

  return (
    <div className="registro-background">
      <div className="registro-page">
        <div className="registro-header">
          <TiArrowBackOutline className="registro-back-icon" onClick={() => navigate('/Inicia-Sesion')} />
          <img src={clientLogo} alt="Client Logo" className="registro-logo" />
        </div>
        <div className="registro-wrapper">
          <form onSubmit={handleSubmit}>
            <h1 className="registro-title">Creando cuenta</h1>
            <FaUserCircle className='registro-user-icon' />
            <div className='registro-input-box'>
              <input
                type="email"
                placeholder='Ingrese su correo'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className='registro-icon' />
            </div>
            <div className='registro-input-box'>
              <input
                type="password"
                placeholder='Ingrese su contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className='registro-icon' />
            </div>
            <div className='registro-input-box'>
              <input
                type="password"
                placeholder='Confirme su contraseña'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className='registro-icon' />
            </div>
            <div className='registro-input-box'>
              <input
                type="tel"
                placeholder='Ingrese su número de teléfono'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <FaPhone className='registro-icon' />
            </div>
            <button type='submit' className='registro-submit-button'>Crear cuenta</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'blue' }}>{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroUser;
