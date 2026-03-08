import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import './ProductItem.css';

// Lazy load image
const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const imgRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return <img ref={imgRef} src={imageSrc || '/placeholder.jpg'} alt={alt} className="product-image" />;
};

function ProductItem({ product }){
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    }));
  };

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className="product-link">
        <LazyImage src={product.thumbnail} alt={product.title} />
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description.substring(0, 100)}...</p>
        </div>
      </Link>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired
};

export default ProductItem;