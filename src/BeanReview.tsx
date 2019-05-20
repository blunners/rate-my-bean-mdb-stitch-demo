import { StitchUser } from 'mongodb-stitch-browser-sdk';
import React from 'react';

export interface BeanReviewModel extends AddBeanReviewModel {
  _id: string;
  userId: string;
}

export interface AddBeanReviewModel {
  title: string;
  rating: number;
  content: string;
  bean: BeanModel;
}

export interface BeanModel {
  name: string;
  origin: string;
}

interface User {
  name: string;
}

interface BeanReviewProps {
  review: BeanReviewModel;
  user: StitchUser | undefined;
}

const BeanReview = ({ review, user }: BeanReviewProps) => (
  <div>
    <div>
      Title: {review.title}
    </div>
    <div>
      User: {(user && user.profile && user.profile.name) || 'unknown'}
    </div>
  </div>
);

export default BeanReview;