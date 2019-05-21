import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AuthContext } from "./AuthContext";

const AuthCallback = ({history}: RouteComponentProps) => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.completeOauthLogin();
    history.push('/');
  }, [authContext, history]);

  return <div>Loading&hellip;</div>
}

export default withRouter(AuthCallback);