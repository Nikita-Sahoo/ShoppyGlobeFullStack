import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './ProductDetail.css';

function ProductDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail
      }));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Product</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-btn">
          Go Back Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-category">Category: {product.category}</p>
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-rating">
            Rating: {product.rating}/5
          </p>
          <p className="product-detail-stock">
            In Stock: {product.stock}
          </p>
          
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
      
      {product.images && product.images.length > 0 && (
        <div className="product-images">
          <h3>More Images</h3>
          <div className="image-gallery">
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={`${product.title} ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;