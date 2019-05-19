import { useContext, useEffect } from 'react';
import { AuthContext } from "./AuthContext";

const AuthCallback = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.completeOauthLogin()
  }, [authContext]);

  return null;
}

export default AuthCallback;