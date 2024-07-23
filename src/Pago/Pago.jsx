import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiArrowBackOutline } from "react-icons/ti";
import { FaWhatsappSquare } from "react-icons/fa";
import './Pago.css';

const Pago = () => {
  const [referenciaData, setReferenciaData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('referenciaData');
    if (data) {
      setReferenciaData(JSON.parse(data));
    }
  }, []);

  const handleBackClick = () => {
    navigate('/MisPedidos'); 
  };

  return (
    <div className="pago-container">
      <header className="pago-header">
        <button className="pago-back" onClick={handleBackClick}>
          <TiArrowBackOutline className="pago-back-icon" />
          <span>Volver</span>
        </button>
        <h1 className="pago-title">Pago</h1>
      </header>
      <main className="pago-main">
        <div className="pago-image-placeholder">
          {referenciaData ? (
            <div className="referencia-info">
              <p><strong>Banco:</strong> {referenciaData.nombreBanco}</p>
              <p><strong>Número de Cuenta:</strong> {referenciaData.numeroCuenta}</p>
              <p><strong>Titular:</strong> {referenciaData.titular}</p>
              <p><strong>Clave Interbancaria:</strong> {referenciaData.claveInterbancaria}</p>
            </div>
          ) : (
            <p>No hay referencia guardada</p>
          )}
        </div>
        <div className="pago-instruction">
          <p>Una vez hecho el pago, manda un mensaje y te atenderemos</p>
          <a href="https://wa.me/tu_numero_telefonico" target="_blank" rel="noopener noreferrer">
            <FaWhatsappSquare className="pago-whatsapp-icon" />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Pago;
