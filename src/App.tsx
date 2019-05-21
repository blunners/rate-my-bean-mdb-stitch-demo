import { AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddReview from './AddReview';
import './App.css';
import AuthCallback from './AuthCallback';
import { AuthProvider } from './AuthContext';
import Header from './Header';
import Home from './Home';
import StitchClient from './StitchClient';

const App: React.FC = () => {
  const [clientAuthentication, setClientAuthentication] = useState({
    appAuthenticated: StitchClient.auth.isLoggedIn
  });

  useEffect(() => {
    if (!clientAuthentication.appAuthenticated) {
      StitchClient.auth.loginWithCredential(new AnonymousCredential())
        .then(user => setClientAuthentication({
          appAuthenticated: true
        }));
    }
  }, [clientAuthentication]);

  return (
    <Router>
      <div className="App">
        {!clientAuthentication.appAuthenticated ?
          <div>Loading&hellip;</div> : (
            <AuthProvider>
              <div className="container-fluid">
                <Header />
              </div>
              <div className="container">
                <Route path="/" exact component={Home} />
                <Route path="/auth-callback" component={AuthCallback} />
                <Route path="/add-review" component={AddReview} />
              </div>
            </AuthProvider>
          )}
      </div>
    </Router>
  );
}

export default App;
