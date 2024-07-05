import React from 'react';
import './Home.css';
import logo from './Assets/logo.jpg';
import { RiLogoutBoxFill } from "react-icons/ri";
import { TbShirtSport, TbBasketCog } from "react-icons/tb";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

const Home = () => {
  return (
    <div className="home">
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="header-right">
          <button className="logout">
            <RiLogoutBoxFill className="logout-icon" />         
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>
      <div className="content">
        <div className="item">
          <button className='item-icon'>
            <TbShirtSport className='icon' />         
            <span>Ver productos</span>
          </button>
        </div>
        <div className="item">
          <button className='item-icon'>
            <TbBasketCog className='icon' />         
            <span>Administrar productos</span>
          </button>
        </div>
        <div className="item">
          <button className='item-icon'>
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
