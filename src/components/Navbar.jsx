import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // 1. Move the hook call INSIDE the component
  const { logout, user } = useAuth();

  return (
    <div className="navbar">
      <div className="navbar-container">
        <h1 className="shop-brand">Shophub</h1>
        <div className="navbar-link">
          <Link to='/' className="navbar-links">Home</Link>
          <Link to='/checkout' className="navbar-links">Cart</Link>
        </div>
        
        { !user ? (
          <div className="auth-navbar">
            <Link to="/auth" className="btn btn-secondary">Login</Link>
            <Link to="/auth" className="btn btn-primary">Signup</Link>
          </div>
        ) : (
          <div className="navbar-user">
            <span className="navbar-greeting">Hello {user.email}</span>
            <button className="btn btn-secondary" onClick={() => logout()}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;