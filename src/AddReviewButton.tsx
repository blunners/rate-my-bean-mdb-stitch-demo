import React from 'react';
import { Link } from 'react-router-dom';
import './AddReviewButton.css';

export default () => <Link className="add-review-button" to="/add-review"><div className="add-review-button">+</div></Link>