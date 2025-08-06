import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaPhone, FaUser, FaPodcast } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../assets/css/AuthPages.css';
import api from '../../services/api';
import RedirectWithTimeout from './RedirectWithTimeout';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [redirectStatus, setRedirectStatus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // if (!formData.email || !formData.phone || !formData.username) {
    //   setError('All fields are required');  
    //   return;
    // }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Invalid email format'); 
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      return;
    }

        
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }


    try {
      setIsLoading(true);
      const response = await api.register({
        username: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      // Store token and redirect
      localStorage.setItem('authToken', response.data.token);
      setSuccess('Registration successful! Redirecting in a moment...');
      // Optionally, you can set user role in localStorage
      localStorage.setItem('userRole', response.data.role || 'user'); // Default to admin if not provided
      // Redirect to home page after successful signup
      setRedirectStatus(true);
      
    } catch (err) {
       if (err.status == 400) {
        setError('Email already exists. Please enter a different email and try again.');
        return;
      } else if (err.status == 500) { 
        setError('Server error. Please try again later.');
        return;
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } 

      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {/* Redirect to home page after successful signup */}
    {redirectStatus && <RedirectWithTimeout delay={5000} path="/user" />}
    <div className="auth-container">
      
      <div className="auth-card">
        <div className="auth-header">
          <FaPodcast className="auth-logo" />
          <h2>Join PodMyth Community</h2>
          <p>Create your account to discover amazing podcasts</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms-agreement">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/signin">Sign in</Link>
            </p>
          </div>
        </form>

        <div className="social-auth">
          <p>Or sign up with:</p>
          <div className="social-buttons">
            <button 
              type="button" 
              className="social-button google"
              onClick={() => window.location.href = '/auth/google'}
            >
              <img src="/google-icon.png" alt="Google" />
              Google
            </button>
            <button 
              type="button" 
              className="social-button apple"
              onClick={() => window.location.href = '/auth/apple'}
            >
              <img src="/apple-icon.png" alt="Apple" />
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;