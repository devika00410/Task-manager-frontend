import React from 'react';
import { useAuth } from '../Context/authContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">Task Manager</div>
      <div className="navbar-items">
        {user ? (
          <>
            <span className="navbar-welcome">Welcome, {user.name}</span>
            <button onClick={logout} className="navbar-logout-btn">Logout</button>
          </>
        ) : (
          <span>Please login</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;