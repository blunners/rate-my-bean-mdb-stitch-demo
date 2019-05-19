import React from 'react';
import bean from './coffee-bean.png';
import './LoadingSpinner.css';
export interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner = () => (
  <div>
    <img className="spinner" src={bean} />
    <p className="spinner">Loading</p>
  </div>
);

export default LoadingSpinner;