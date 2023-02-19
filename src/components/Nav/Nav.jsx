import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import logo from '../LogoImage/diamondhands.jpeg';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/home">
          <h2 className="nav-title"> ♦️ Diamond Hands ♦️</h2>
        </Link>
      </div>

      <div className="nav-links">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}

            <Link className="navLink" to="/search">
              Search 
            </Link>

            <Link className="navLink" to="/watchlist">
              Watchlist 
            </Link>

            <Link className="navLink" to="/chart">
              Charts 
            </Link>

            <Link className="navLink" to="/about">
              About
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;