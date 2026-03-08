import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <div className="not-found-details">
          <p>Error Code: 404 - Not Found</p>
          <p>Please check the URL and try again</p>
        </div>
        <Link to="/" className="home-link">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;