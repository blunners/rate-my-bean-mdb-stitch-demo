import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Header.css';
import logo from './logo.png';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, beginOauthLogin } = useContext(AuthContext);

  const onLogout = async () => {
    await logout();
    window.location.pathname = '/';
  }

  return (
    <>
      <header className="text-center">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <Link to="/">
              <img className="header" alt="logo" src={logo} />
            </Link>
          </div>
          <div className="col">
            {isAuthenticated ?
              (<div>
                <span className="align-middle">
                  Hello, {user!.name}
                </span>
                <button className="btn btn-link" onClick={onLogout}>Logout</button>
              </div>) :
              <button className="btn btn-link" onClick={beginOauthLogin}>Login</button>}
          </div>
        </div>
      </header>
    </>
  )
};

export default Header;