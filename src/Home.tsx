import { RemoteMongoClient, StitchUser } from 'mongodb-stitch-browser-sdk';
import React, { useContext, useEffect, useState } from 'react';
import AddReviewButton from './AddReviewButton';
import { AuthContext } from './AuthContext';
import BeanReview, { BeanReviewModel } from './BeanReview';
import './Home.css';
import StitchClient from './StitchClient';
import { Binary } from 'crypto';

const decoder = new TextDecoder();

interface S3File {
  Body: Binary;
}

const getReviews = async () => {
  const client = StitchClient.getServiceClient(RemoteMongoClient.factory, 'rate-my-bean');
  const reviewCollection = client.db('rate-my-bean-web').collection<BeanReviewModel>('bean-reviews');

  const reviews = await reviewCollection.find({}).toArray();

  return reviews;
}

const getUsers = async () => {
  const users = await StitchClient.auth.listUsers();

  return users;
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

  const [users, setUsers] = useState([] as StitchUser[]);
  useEffect(() => {
    getUsers().then(u => setUsers(u));
  }, []);

  return (
    <div>
      <div className="row">
        {users.length > 0 && reviews.length > 0 && reviews.map(review => (
          <div className="col-sm-12" key={review._id.toString()}>
            <BeanReview review={review} onImageRequest={retrieveImage} user={users.find(x => x.id === review.userId)} />
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