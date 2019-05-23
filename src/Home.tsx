import { Binary } from 'crypto';
import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import React, { useContext, useEffect, useState } from 'react';
import AddReviewButton from './AddReviewButton';
import { AuthContext } from './AuthContext';
import BeanReview, { BeanReviewModel } from './BeanReview';
import './Home.css';
import StitchClient from './StitchClient';

const decoder = new TextDecoder();

interface S3File {
  Body: Binary;
}

const getReviews = async () => {
  const client = StitchClient.getServiceClient(RemoteMongoClient.factory, 'rate-my-bean');
  const reviewCollection = client.db('rate-my-bean-web').collection<BeanReviewModel>('bean-reviews');

  const reviews = await reviewCollection.find({}, {
    sort: {
      "_id": -1
  }}).toArray();

  return reviews;
}

const retrieveImage = async (id: string) => {
  const img: S3File = await StitchClient.callFunction('getImg', [id]);
  if (img) {
    return decoder.decode(img.Body.buffer);
  }

  return null;
}

const Home = () => {
  const authContext = useContext(AuthContext);

  const [reviews, setReviews] = useState([] as BeanReviewModel[]);
  useEffect(() => {
    getReviews().then(r => setReviews(r));
  }, []);

  return (
    <div>
      <div className="row">
        {reviews.map(review => (
          <div className="col-sm-12" key={review._id.toString()}>
            <BeanReview review={review} onImageRequest={retrieveImage} />
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