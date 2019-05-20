import { RemoteMongoClient, StitchUser } from 'mongodb-stitch-browser-sdk';
import React, { useContext, useEffect, useState } from 'react';
import AddReviewButton from './AddReviewButton';
import { AuthContext } from './AuthContext';
import BeanReview, { BeanReviewModel } from './BeanReview';
import './Home.css';
import StitchClient from './StitchClient';

const getReviews = async () => {
  const db = StitchClient.getServiceClient(RemoteMongoClient.factory, 'rate-my-bean');
  const reviewCollection = db.db('rate-my-bean-web').collection<BeanReviewModel>('bean-reviews');

  const reviews = await reviewCollection.find({}).toArray();

  return reviews;
}

const getUsers = async () => {
  const users = await StitchClient.auth.listUsers();

  return users;
}

const Home = () => {
  const authContext = useContext(AuthContext);
  
  const [reviews, setReviews] = useState([] as BeanReviewModel[]);
  useEffect(() => {
    getReviews().then(r => setReviews(r));
  }, []);

  const [users, setUsers] = useState([] as StitchUser[]);
  useEffect(() => {
    getUsers().then(u => setUsers(u));
  }, []);

  return (
    <div>
      <div className="reviews">
        {users.length && reviews.length && reviews.map(review => (
          <div className="review-item" key={review._id.toString()}>
            <BeanReview review={review} user={users.find(x => x.id === review.userId)} />
          </div>
        ))}
      </div>
      {authContext.isAuthenticated &&
      <div className="add-review">
        <AddReviewButton />
      </div>}
    </div>
  )
}

export default Home