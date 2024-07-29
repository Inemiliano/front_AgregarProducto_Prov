import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActualizarReferencia.css';
import { TiHome } from "react-icons/ti";
import axios from 'axios';  // Asegúrate de tener axios instalado: npm install axios

const ActualizarReferencia = () => {
  const [nombreBanco, setNombreBanco] = useState('');
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [titular, setTitular] = useState('');
  const [claveInterbancaria, setClaveInterbancaria] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const referenciaData = localStorage.getItem('referenciaData');
    if (referenciaData) {
      const { nombreBanco = '', numeroCuenta = '', titular = '', claveInterbancaria = '' } = JSON.parse(referenciaData);
      setNombreBanco(nombreBanco);
      setNumeroCuenta(numeroCuenta);
      setTitular(titular);
      setClaveInterbancaria(claveInterbancaria);
    }
  }, []);
  

  const handleSave = async () => {
    const referenciaData = { nombreBanco, numCuenta: numeroCuenta, duenoCuenta: titular, clabeBanco: claveInterbancaria };
    localStorage.setItem('referenciaData', JSON.stringify(referenciaData));

    try {
      const response = await axios.post('http://localhost:4000/api/datosTransferencia/agregar', referenciaData);
      alert('Datos guardados correctamente en el servidor');
    } catch (error) {
      console.error('Error al guardar los datos en el servidor:', error);
      alert('Hubo un error al guardar los datos en el servidor');
    }
  };

  const handleBackClick = () => {
    navigate('/Home');
  };

  return (
    <div className="reference-container">
      <header className="reference-header">
        <button className="reference-home" onClick={handleBackClick}>
          <TiHome className="reference-home-icon" />
          <span>Inicio</span>
        </button>
        <h1>Actualizar Referencia</h1>
      </header>
      <form id="referenceForm">
        <label>Nombre del Banco</label>
        <input
          type="text"
          value={nombreBanco}
          onChange={(e) => setNombreBanco(e.target.value)}
          required
        />
        <label>Número de Cuenta</label>
        <input
          type="text"
          value={numeroCuenta}
          onChange={(e) => setNumeroCuenta(e.target.value)}
          required
        />
        <label>Nombre del Titular</label>
        <input
          type="text"
          value={titular}
          onChange={(e) => setTitular(e.target.value)}
          required
        />
        <label>Clave Interbancaria</label>
        <input
          type="text"
          value={claveInterbancaria}
          onChange={(e) => setClaveInterbancaria(e.target.value)}
          required
        />
        <button type="button" onClick={handleSave}>Guardar</button>
      </form>
    </div>
  );
};

export default ActualizarReferencia;