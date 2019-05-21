import React from 'react';
import bean from './coffee-bean.png';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div>
    <img className="spinner" alt="spinner" src={bean} />
    <p className="spinner">Loading</p>
  </div>
);

export default LoadingSpinner;