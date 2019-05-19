import React from 'react';
import { AuthConsumer } from './AuthContext';
import './Header.css';
import logo from './logo.png';

const Header: React.FC = () => {
  return (
    <>
      <header>
        <AuthConsumer>
          {(authState) => (
            <div>
              <img className="header" src={logo} />
              <div>
                  {authState.isAuthenticated ?
                    (<div>
                      <span>
                        Hello, {authState.user!.name}
                      </span>
                      <button className="header" onClick={authState.logout}>Logout</button>
                    </div>) :
                    <button className="header" onClick={authState.beginOauthLogin}>Login</button>}
              </div>
            </div>
          )}
        </AuthConsumer>
      </header>
    </>
  )
};

export default Header;