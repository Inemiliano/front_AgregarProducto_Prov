import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TiArrowBackOutline } from "react-icons/ti";
import { FaWhatsappSquare } from "react-icons/fa";
import './Pago.css';

const Pago = () => {
  const navigate = useNavigate();

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
          <img src="placeholder.png" alt="Comprobante de pago" />
        </div>
        <div className="pago-instruction">
          <p>Una vez hecho el pago, manda un mensaje y te atenderemos</p>
          <FaWhatsappSquare className="pago-whatsapp-icon" />
        </div>
      </main>
    </div>
  );
};

export default Pago;
