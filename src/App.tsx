import { AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import AuthCallback from './AuthCallback';
import { AuthProvider } from './AuthContext';
import Header from './Header';
import Home from './Home';
import LoadingSpinner from './LoadingSpinner';
import StitchClient from './StitchClient';

const App: React.FC = () => {
  const [clientAuthentication, setClientAuthentication] = useState({
    appAuthenticated: StitchClient.auth.isLoggedIn,
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
          <LoadingSpinner /> : (
            <AuthProvider>
              <Header />
              <Route path="/" exact component={Home} />
              <Route path="/auth-callback" component={AuthCallback} />
            </AuthProvider>
          )}
      </div>
    </Router>
  );
}

export default App;
