import { GoogleRedirectCredential } from "mongodb-stitch-browser-sdk";
import React, { createContext, useState } from "react";
import StitchClient from './StitchClient';

export interface User {
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  beginOauthLogin: () => void;
  completeOauthLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthState);
const AuthProvider: React.FC = ({ children }) => {
  const beginOauthLogin = () => {
    const credential = new GoogleRedirectCredential(`${window.location.origin}/auth-callback`);
    StitchClient.auth.loginWithRedirect(credential);
  }

  const completeOauthLogin = async () => {
    if (StitchClient.auth.hasRedirectResult) {
      try {
        const user = await StitchClient.auth.handleRedirectResult();
        const newState: AuthState = {
          ...authState,
          ...{
            isAuthenticated: true,
            user: {
              name: user.profile.name || 'anonymous'
            }
          }
        };
        setAuthState(newState);
      } catch { }
    }
  }

  const isAuthenticated = () => StitchClient.auth.isLoggedIn && StitchClient.auth.user!.loggedInProviderType !== 'anon-user';

  const logout = async () => {
    await StitchClient.auth.logout();
  }

  const getDefaultAuthState: () => AuthState = () => {
    return {
      isAuthenticated: isAuthenticated(),
      beginOauthLogin: beginOauthLogin,
      logout,
      user: {
        name: isAuthenticated() ? StitchClient.auth.user!.profile.name || 'anonymous' : 'anonymous'
      },
      completeOauthLogin
    }
  };

  const [authState, setAuthState] = useState(getDefaultAuthState());

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

