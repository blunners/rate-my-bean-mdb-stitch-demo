import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import React, { useContext, useEffect, useState } from 'react';
import AddReviewButton from './AddReviewButton';
import { AuthContext } from './AuthContext';
import { BeanReview } from './BeanReview';
import './Home.css';
import StitchClient from './StitchClient';

const getReviews = async () => {
  const db = StitchClient.getServiceClient(RemoteMongoClient.factory, 'rate-my-bean');
  const reviewCollection = db.db('rate-my-bean-web').collection<BeanReview>('bean-reviews');

  const reviews = await reviewCollection.find({}).toArray();

  return reviews;
}

const Home = () => {
  const [reviews, setReviews] = useState([] as BeanReview[]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getReviews().then(r => setReviews(r));
  }, []);

  return (
    <>
      <div>
        {reviews.map(review => (
          <div>{review.id}</div>
        ))}
      </div>
      {authContext.isAuthenticated &&
      <div className="add-review">
        <AddReviewButton />
      </div>}
    </>
  )
}

export default Home