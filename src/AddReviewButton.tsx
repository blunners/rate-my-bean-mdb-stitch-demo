import React from 'react';
import { Link } from 'react-router-dom';
import './AddReviewButton.css';

export default () => <Link className="btn btn-primary btn-add-review" to="/add-review"><span className="add-review-icon">+</span></Link>