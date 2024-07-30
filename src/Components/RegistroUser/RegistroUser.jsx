import React, { useState } from 'react';
import './RegistroUser.css';
import { FaUserCircle, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import clientLogo from './Assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistroUser = () => {
  const [usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [email, setEmail] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pass !== confirmPass) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      usuario,
      pass,
      email,
      apellidoP,
      apellidoM,
      nombre,
      rol_id: 5
    };

    try {
      const response = await axios.post('https://velasportapi.integrador.xyz/users/agregar', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setSuccess('Su cuenta se creó correctamente');
        setError('');
        setTimeout(() => {
          navigate('/Inicia-Sesion');
        }, 4000);
      } else {
        setError(response.data.message || 'Error al crear la cuenta');
        setSuccess('');
      }
    } catch (err) {
      setError('Error de conexión. Inténtelo de nuevo más tarde.');
      setSuccess('');
    }
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
                type="text"
                placeholder='Nombre de usuario'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
              <FaUser className='registro-icon' />
            </div>

            <div className='registro-input-box'>
              <input
                type="password"
                placeholder='Ingrese su contraseña'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <FaLock className='registro-icon' />
            </div>

            <div className='registro-input-box'>
              <input
                type="password"
                placeholder='Confirme su contraseña'
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
              <FaLock className='registro-icon' />
            </div>

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
                type="text"
                placeholder='Apellido Paterno'
                value={apellidoP}
                onChange={(e) => setApellidoP(e.target.value)}
                required
              />
              <FaUser className='registro-icon' />
            </div>

            <div className='registro-input-box'>
              <input
                type="text"
                placeholder='Apellido Materno'
                value={apellidoM}
                onChange={(e) => setApellidoM(e.target.value)}
                required
              />
              <FaUser className='registro-icon' />
            </div>

            <div className='registro-input-box'>
              <input
                type="text"
                placeholder='Nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <FaUser className='registro-icon' />
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




