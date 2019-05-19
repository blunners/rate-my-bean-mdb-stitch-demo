import { AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddReview from './AddReview';
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
    loading: false
  });
  useEffect(() => {
    if (!clientAuthentication.appAuthenticated) {
      StitchClient.auth.loginWithCredential(new AnonymousCredential())
        .then(user => setClientAuthentication({
          appAuthenticated: true,
          loading: false
        }));
    }
  }, [clientAuthentication]);

  const setLoading = (loading: boolean) => {
    setClientAuthentication({
      appAuthenticated: true,
      loading
    });
  }

  return (
    <Router>
      <div className="App">
        {!clientAuthentication.appAuthenticated || clientAuthentication.loading ?
          <LoadingSpinner /> : (
            <AuthProvider onLoading={() => setLoading(true)} onLoaded={() => setLoading(false)}>
              <Header />
              <Route path="/" exact component={Home} />
              <Route path="/auth-callback" component={AuthCallback} />
              <Route path="/add-review" component={AddReview} />
            </AuthProvider>
          )}
      </div>
    </Router>
  );
}

export default App;
