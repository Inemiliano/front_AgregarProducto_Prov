import React from 'react';
import './LoginForm.css';
import { FaUserCircle, FaUser, FaLock } from "react-icons/fa";
import logo from './Assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logica
    onLogin();
  };

  return (
    <div className="page">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>       
          <h1 className="title">Inicie sesión por favor</h1>
          <FaUserCircle className='user' />
          <div className='input-box'>
            <input type="text" placeholder='Usuario' required />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Contraseña' required />
            <FaLock className='icon' />
          </div>
          <button onSubmit={handleSubmit} type='submit'>Iniciar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
