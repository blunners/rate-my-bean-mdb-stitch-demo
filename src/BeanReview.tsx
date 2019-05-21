import { StitchUser } from 'mongodb-stitch-browser-sdk';
import React, { useState, useEffect } from 'react';
import './BeanReview.css';

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
  user: StitchUser | undefined;
  onImageRequest: (id: string) => Promise<string | null>
}

const BeanReview = ({ review, user, onImageRequest }: BeanReviewProps) => {
  const [img, setImg] = useState<string>();

  useEffect(() => {
    onImageRequest(review._id.toString()).then(x => {
      x && setImg(x);
    });
  }, [onImageRequest, review._id]);

  return (
    <div className="bean-review-wrapper">
      <div>
        <h2>{review.bean.name}</h2>
        <span>{review.bean.origin}</span>
      </div>
      <div className="h4 font-italic">{review.title} - {review.rating}/5</div>
      <div>
        <img src={img} alt="beans" />
      </div>
      <div>
        <p>
          {review.content}
        </p>
      </div>
      <div className="font-italic">
        {(user && user.profile && user.profile.name) || 'unknown'}
      </div>

      <hr />
    </div>
  )
};

export default BeanReview;