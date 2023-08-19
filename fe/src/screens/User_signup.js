import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/user_signup.css'
import { BASE_URL } from '../config';

const User_signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !phone || !email || !password || !address) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'All fields are required',
      });
      return;
    }

    const user = { firstName, lastName, phone, email, password, address };
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/user_signup`, user);
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: response.data.message,
        });
        setLoading(false);
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error Occurred',
          text: response.data.message,
        });
        setLoading(false);
      }
      setAddress('');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setPhone('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Error Occurred',
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error Occurred',
          text: 'An error occurred while processing your request. Please try again later.',
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">User Registration</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName" className="custom-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
            className="custom-form"
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="custom-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
            className="custom-form"
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="custom-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            maxLength="10"
            onChange={(ev) => setPhone(ev.target.value)}
            className="custom-form"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="custom-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="custom-form"
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="custom-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="custom-form"
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="custom-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            className="custom-form"
            placeholder="Enter your address"
          />
        </div>
        {loading ? (
          <div className="spinner-container">
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <button type="submit" className="submit-button">
            Register
          </button>
        )}
      </form>
      {!loading && (
        <div className="login-link-container">
          <p>Already a user? </p>
          <button className="login-link" onClick={handleLogin}>
            Login here
          </button>
        </div>
      )}
    </div>
  );
};

export default User_signup;
