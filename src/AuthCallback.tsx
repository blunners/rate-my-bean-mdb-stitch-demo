import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AuthContext } from "./AuthContext";
import Loading from './Loading';

const AuthCallback = ({ history }: RouteComponentProps) => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.completeOauthLogin();
    history.push('/');
  }, [authContext, history]);

  return <div className="text-center">
    <Loading />
  </div>
}

export default withRouter(AuthCallback);