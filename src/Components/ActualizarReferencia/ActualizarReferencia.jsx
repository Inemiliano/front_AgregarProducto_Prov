import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ActualizarReferencia.css';
import { TiHome } from "react-icons/ti";

const ActualizarReferencia = () => {
  const [nombreBanco, setNombreBanco] = useState('');
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [titular, setTitular] = useState('');
  const [claveInterbancaria, setClaveInterbancaria] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const referenciaData = localStorage.getItem('referenciaData');
    if (referenciaData) {
      const { nombreBanco, numeroCuenta, titular, claveInterbancaria } = JSON.parse(referenciaData);
      setNombreBanco(nombreBanco);
      setNumeroCuenta(numeroCuenta);
      setTitular(titular);
      setClaveInterbancaria(claveInterbancaria);
    }
  }, []);

  const handleSave = () => {
    const referenciaData = { nombreBanco, numeroCuenta, titular, claveInterbancaria };
    localStorage.setItem('referenciaData', JSON.stringify(referenciaData));
    alert('Datos guardados correctamente');
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
