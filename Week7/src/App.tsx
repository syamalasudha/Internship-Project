/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Navbar } from './components/Navbar/Navbar';
import { ShieldAlert, LogIn, UserPlus, Heart } from 'lucide-react';

// Lazy Loaded Pages
const Home = React.lazy(() => import('./pages/Home'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));

/**
 * Route protector for Checkout page.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * Login Sub-page component (implemented in App.tsx to comply with strict file tree)
 */
const LoginView: React.FC = () => {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to home or checkout
  React.useEffect(() => {
    if (currentUser) {
      navigate('/checkout');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);

    if (result.success) {
      navigate('/checkout');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container glass-panel" id="login-view">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">
          Don't have an account?{' '}
          <Link to="/register" className="auth-subtitle-link">
            Sign up free
          </Link>
        </p>
      </div>

      {error && <div className="auth-error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? 'Signing in securely...' : 'Sign In'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
        Demo Account: <strong>user@example.com</strong> / <strong>password123</strong> (after registering)
      </div>
    </div>
  );
};

/**
 * Register Sub-page component (implemented in App.tsx to comply with strict file tree)
 */
const RegisterView: React.FC = () => {
  const { register, currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to checkout
  React.useEffect(() => {
    if (currentUser) {
      navigate('/checkout');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await register({ name, email, password });
    setLoading(false);

    if (result.success) {
      navigate('/checkout');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container glass-panel" id="register-view">
      <div className="auth-header">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">
          Already have an account?{' '}
          <Link to="/login" className="auth-subtitle-link">
            Sign in
          </Link>
        </p>
      </div>

      {error && <div className="auth-error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="app-container">
            {/* Global Sticky Navigation Bar */}
            <Navbar />

            {/* Main Layout Area */}
            <main className="main-content">
              <Suspense
                fallback={
                  <div className="loader-container">
                    <div className="spinner"></div>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: 500, marginTop: '1rem' }}>
                      Loading content dynamically...
                    </p>
                  </div>
                }
              >
                <Routes>
                  {/* Home Route */}
                  <Route path="/" element={<Home />} />

                  {/* Product Details Route */}
                  <Route path="/product/:id" element={<ProductDetail />} />

                  {/* Shopping Cart Route */}
                  <Route path="/cart" element={<CartPage />} />

                  {/* Protected Checkout Route */}
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Authentication Routes */}
                  <Route path="/login" element={<LoginView />} />
                  <Route path="/register" element={<RegisterView />} />

                  {/* Unknown Route: Redirect to Home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            {/* Global Footer Layout */}
            <footer className="footer">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span>Made with</span>
                <Heart size={14} style={{ fill: 'var(--error-color)', color: 'var(--error-color)' }} />
                <span>for modern e-shoppers © 2026 InstaShop Inc.</span>
              </div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>
                Secure connections protected with AES-256 local storage session state tokens.
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
