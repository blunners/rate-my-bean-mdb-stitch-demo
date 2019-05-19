import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AuthContext } from "./AuthContext";
import LoadingSpinner from './LoadingSpinner';

const AuthCallback = ({history}: RouteComponentProps) => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.completeOauthLogin();
    history.push('/');
  }, [authContext, history]);

  return <LoadingSpinner />
}

export default withRouter(AuthCallback);