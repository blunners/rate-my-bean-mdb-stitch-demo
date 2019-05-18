import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import AuthCallback from './AuthCallback';
import Header from './Header';
import Home from './Home';

const App: React.FC = () => {
  console.log('app called');
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/auth-callback" component={AuthCallback} />
      </div>
    </Router>
  );
}

export default App;
