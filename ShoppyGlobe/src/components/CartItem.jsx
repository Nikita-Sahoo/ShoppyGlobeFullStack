import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({
      id: item.id,
      quantity: item.quantity + 1
    }));
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        id: item.id,
        quantity: item.quantity - 1
      }));
    }
  };

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
      
      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p className="cart-item-price">${item.price}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button onClick={handleDecreaseQuantity} className="quantity-btn">-</button>
        <span className="quantity-value">{item.quantity}</span>
        <button onClick={handleIncreaseQuantity} className="quantity-btn">+</button>
      </div>
      
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      
      <button onClick={handleRemove} className="remove-btn">
        Remove
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired
};

export default CartItem;