import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Header.css';
import logo from './logo.png';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, beginOauthLogin } = useContext(AuthContext);

  return (
    <>
      <header className="text-center">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <Link to="/">
              <img className="header" alt="logo" src={logo} />
            </Link>
          </div>
          <div className="col text-left">
            {isAuthenticated ?
              (<div>
                <span className="align-middle">
                  Hello, {user!.name}
                </span>
                <button className="btn btn-link" onClick={logout}>Logout</button>
              </div>) :
              <button className="btn btn-link" onClick={beginOauthLogin}>Login</button>}
          </div>
        </div>
      </header>
    </>
  )
};

export default Header;