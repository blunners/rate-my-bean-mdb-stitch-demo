import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import StitchClient from './StitchClient';
import { AddBeanReviewModel } from './BeanReview';

class AddBeanReview implements AddBeanReviewModel {
  constructor(userId: string) {
    this.userId = userId;
  }

  title = '';
  rating = 3;
  content = '';
  bean = {
    name: '',
    origin: '',
  };
  userId: string;
}

const AddReview = ({ history }: RouteComponentProps) => {
  const [beanReview, setBeanReview] = useState(new AddBeanReview(StitchClient.auth.user!.id));
  const [img, setImage] = useState<File>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const serviceClient = StitchClient.getServiceClient(RemoteMongoClient.factory, 'rate-my-bean');
    const reviewCollection = serviceClient.db('rate-my-bean-web').collection<AddBeanReview>('bean-reviews');

    const result = await reviewCollection.insertOne(beanReview);

    if (img) {
      var reader = new FileReader();
      reader.onload = async () => {
        var url = reader.result;
        await StitchClient.callFunction('uploadImg', [result.insertedId.toString(), url]);
        history.push('/');
      }

      reader.readAsDataURL(img);
      return;
    }

    history.push('/');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const review = { ...beanReview, [event.target.name]: event.target.value };
    setBeanReview(review);
  }

  const handleBeanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bean = { ...beanReview.bean, [event.target.name]: event.target.value }
    const review = { ...beanReview, bean };
    setBeanReview(review);
  }

  return <form onSubmit={handleSubmit}>
    <h2>Bean Details</h2>
    <fieldset>
      <label>
        Name
      <input type="text" value={beanReview.bean.name} name="name" onChange={handleBeanChange} />
      </label>
      <label>
        Origin
      <input type="text" value={beanReview.bean.origin} name="origin" onChange={handleBeanChange} />
      </label>
    </fieldset>
    <label>
      Title
      <input type="text" value={beanReview.title} name="title" onChange={handleChange} />
    </label>
    <label>
      Rating
      <input type="number" min="1" max="5" step="1" value={beanReview.rating} name="rating" onChange={handleChange} />
    </label>
    <label>
      Review
      <input type="text" value={beanReview.content} name="content" onChange={handleChange} />
    </label>
    <input type="file" onChange={(e) => { debugger; setImage(e.target.files![0]); }} name="imgData" accept="image/*" />
    <input type="submit" value="Submit" />
  </form>
}

export default withRouter(AddReview);