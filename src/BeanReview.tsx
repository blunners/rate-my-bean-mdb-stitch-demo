import React, { useEffect, useState } from 'react';
import './BeanReview.css';
import Loading from './Loading';

export interface BeanReviewModel extends AddBeanReviewModel {
  _id: string;
}

export interface AddBeanReviewModel {
  title: string;
  rating: number;
  content: string;
  bean: BeanModel;
  user: UserModel;
}

export interface UserModel {
  id: string;
  firstName: string;
  surname: string; 
}

export interface BeanModel {
  name: string;
  origin: string;
}

interface BeanReviewProps {
  review: BeanReviewModel;
  onImageRequest: (id: string) => Promise<string | null>
}

const BeanReview = ({ review, onImageRequest }: BeanReviewProps) => {
  const [img, setImg] = useState<string>();

  useEffect(() => {
    onImageRequest(review._id.toString()).then(x => {
      x && setImg(x);
    });
  }, [onImageRequest, review._id]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-9">
          <div>
            <h2>{review.bean.name}</h2>
            <span>{review.bean.origin}</span>
          </div>
          <div className="h4 font-italic">{review.title} - {review.rating}/5</div>
          <div>
            <p className="text-justify">
              {review.content}
            </p>
          </div>
          <div className="font-italic">
            {`${review.user.firstName} ${review.user.surname}`}
          </div>
        </div>
        <div className="col-lg-3 text-center">
          <div>
            {img ?
            <img src={img} className="img-fluid bean" alt="beans" /> :
            <Loading className="img-fluid bean" />}
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
};

export default BeanReview;