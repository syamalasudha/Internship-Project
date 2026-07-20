import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, LogOut, LogIn, UserPlus, Menu, X, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <span style={{ fontSize: '1.6rem', marginRight: '0.2rem' }}>✨</span>
          <span>InstaShop</span>
        </Link>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button className="mobile-nav-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="cart-badge-container">
              <ShoppingCart size={18} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
            <span>Cart</span>
          </NavLink>

          {currentUser ? (
            <>
              <NavLink
                to="/checkout"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Checkout</span>
              </NavLink>
              <div className="user-welcome">
                Hi, <strong>{currentUser.name}</strong>
              </div>
              <button onClick={handleLogout} className="nav-btn-logout">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn size={18} />
                <span>Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserPlus size={18} />
                <span>Register</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
