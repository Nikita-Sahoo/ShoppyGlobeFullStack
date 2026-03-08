import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount } from '../redux/cartSlice';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <Link to="/" className="shop-now-btn">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;