import { Stitch } from 'mongodb-stitch-browser-sdk';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { STITCH_APP_ID } from './Constants';
import './index.css';

Stitch.initializeDefaultAppClient(STITCH_APP_ID);
ReactDOM.render(<App />, document.getElementById('root'));