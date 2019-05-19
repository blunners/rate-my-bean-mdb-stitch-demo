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

interface BeanReviewProps {
  review: BeanReviewModel;
}

const BeanReview = ({review}: BeanReviewProps) => (
  <div>
    {review._id.toString()}
  </div>
)

export default BeanReview;