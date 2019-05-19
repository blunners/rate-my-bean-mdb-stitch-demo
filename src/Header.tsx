import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Header.css';
import logo from './logo.png';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, beginOauthLogin } = useContext(AuthContext);

  return (
    <>
      <header>
        <div>
          <Link to="/">
            <img className="header" src={logo} />
          </Link>
          <div>
            {isAuthenticated ?
              (<div>
                <span>
                  Hello, {user!.name}
                </span>
                <button className="header" onClick={logout}>Logout</button>
              </div>) :
              <button className="header" onClick={beginOauthLogin}>Login</button>}
          </div>
        </div>
      </header>
    </>
  )
};

export default Header;