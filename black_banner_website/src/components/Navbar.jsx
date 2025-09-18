import React from 'react';
import bb from '../assets/bb.jpg';

const Navbar = ({ setCartOpen }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div>
          <a href="#home">
            <img src={bb} alt="home" className="logo-img" />
          </a>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#products" className="nav-link">Products</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link cart-icon" id="cart-btn" onClick={() => setCartOpen(true)}>Cart (<span>0</span>)</a>
          </li>
        </ul>
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;