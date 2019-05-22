import { RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AddBeanReviewModel } from './BeanReview';
import StitchClient from './StitchClient';

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

const insertReview = async (beanReview: AddBeanReview) => {
  const serviceClient = StitchClient.getServiceClient(RemoteMongoClient.factory, 'rate-my-bean');
  const reviewCollection = serviceClient.db('rate-my-bean-web').collection<AddBeanReview>('bean-reviews');
  const { insertedId }: { insertedId: ObjectId } = await reviewCollection.insertOne(beanReview);

  return insertedId.toString();
}

const beginUploadImage = (insertedId: string, img: File, onUploaded: () => void) => {
  var reader = new FileReader();
  reader.onload = async () => {
    var url = reader.result;
    await StitchClient.callFunction('uploadImg', [insertedId, url]);
    onUploaded();
  };

  reader.readAsDataURL(img);
}


const AddReview = ({ history }: RouteComponentProps) => {
  const [beanReview, setBeanReview] = useState(new AddBeanReview(StitchClient.auth.user!.id));
  const [img, setImage] = useState<File>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const insertedId = await insertReview(beanReview);
    const onUploaded = () => history.push('/');

    if (img) {
      beginUploadImage(insertedId, img, onUploaded);
      return;
    }

    onUploaded();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const review = { ...beanReview, [event.target.name]: event.target.value };
    setBeanReview(review);
  }

  const handleBeanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bean = { ...beanReview.bean, [event.target.name]: event.target.value }
    const review = { ...beanReview, bean };
    setBeanReview(review);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6">
          <h2>Bean Details</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" value={beanReview.bean.name} id="name" name="name" className="form-control" onChange={handleBeanChange} />
          </div>
          <div className="form-group">
            <label htmlFor="origin">Origin</label>
            <input type="text" value={beanReview.bean.origin} id="origin" name="origin" className="form-control" onChange={handleBeanChange} />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" value={beanReview.title} id="title" name="title" className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input type="number" min="1" max="5" step="1" value={beanReview.rating} id="rating" name="rating" className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="content">Your Review</label>
            <textarea value={beanReview.content} rows={10} id="content" name="content" className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="imgData">Upload your bean</label>
            <input type="file" className="form-control-file" onChange={(e) => { setImage(e.target.files![0]); }} id="imgData" name="imgData" accept="image/*" />
          </div>
          <button type="submit" className="btn btn-primary" value="Submit">Submit</button>
        </div>
      </div>
    </form>
  )
}

export default withRouter(AddReview);