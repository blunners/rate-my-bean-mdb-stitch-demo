import { GoogleRedirectCredential, Stitch } from 'mongodb-stitch-browser-sdk';
import React from 'react';
import { STITCH_APP_ID } from './Constants';
import './Header.css';
import logo from './logo.png';

const Header: React.FC = () => {
  const client = Stitch.getAppClient(STITCH_APP_ID);
  console.log(client.auth.user);
  const isAnonymous = () => !client.auth.isLoggedIn || client.auth.user!.loggedInProviderType === 'anon-user';
  const redirectToGoogleLogin = () => {
    const credential = new GoogleRedirectCredential('http://localhost:3000/auth-callback');
    client.auth.loginWithRedirect(credential);
  }
  const logout = async () => {
    await client.auth.logout();
    window.location.reload();
  }

  return (
    <>
      <header>
        <div>
          <img src={logo} />
        </div>
        <div>
          <div>
            {!isAnonymous() ?
              (<div>
                <span>
                  Hello, {client.auth.user!.profile.firstName || 'anonymous'}
                </span>
                <button onClick={logout}>Logout</button>
              </div>) :
              <button onClick={redirectToGoogleLogin}>Login</button>}
          </div>
        </div>
      </header>
    </>
  )
};

export default Header;