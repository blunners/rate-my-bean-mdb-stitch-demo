import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AuthContext } from "./AuthContext";
import LoadingSpinner from './LoadingSpinner';

const AuthCallback = (props: RouteComponentProps) => {
  const { history } = props;

  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.completeOauthLogin();
    history.push('/');
  }, [authContext, history]);

  return <LoadingSpinner />
}

export default withRouter(AuthCallback);