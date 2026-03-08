import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../redux/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import './Header.css';

function Header (){
  const cartQuantity = useSelector(selectCartTotalQuantity);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>ShoppyGlobe</h1>
        </Link>
        
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link cart-link">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-badge">{cartQuantity}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;