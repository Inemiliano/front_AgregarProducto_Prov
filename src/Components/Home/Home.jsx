import React from 'react';
import './Home.css';
import logo from './Assets/logo.jpg';
import { RiLogoutBoxFill } from "react-icons/ri";
import { TbShirtSport, TbBasketCog } from "react-icons/tb";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'; 

const Home = ({ onLogout }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/Login'); 
    }
  };
  
  const handleVerProductos = () => {
    navigate('/VerProductos'); 
  };

  const handleAdministrarProductos = () => {
    navigate('/AdministrarProductos'); 
  };

  const handleVerPedidos = () => {
    navigate('/VerPedidos'); 
  };

  return (
    <div className="home">
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo-home" />
        </div>
        <div className="header-right">
          <button className="logout" onClick={handleLogout}>
            <RiLogoutBoxFill className="logout-icon" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>
      <div className="content">
        <div className="item">
          <button className='item-icon' onClick={handleVerProductos}>
            <TbShirtSport className='icon' />
            <span>Ver productos</span>
          </button>
        </div>
        <div className="item">
          <button className='item-icon' onClick={handleAdministrarProductos}>
            <TbBasketCog className='icon' />
            <span>Administrar productos</span>
          </button>
        </div>
        <div className="item">
          <button className='item-icon' onClick={handleVerPedidos}>
            <FaEnvelopeOpenText className='icon' />
            <span>Ver pedidos</span>
          </button>
        </div>
        <div className="item">
          <button className='item-icon'>
            <BsGraphUpArrow className='icon' />
            <span>Ver ventas</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
