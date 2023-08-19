import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/admin_signup.css';

const AdminSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !phone || !email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'All fields are required',
      });
    } else {
      const admin = { firstName, lastName, phone, email, password };
      setLoading(true);
      axios
        .post(`${BASE_URL}/admin-signup`, admin)
        .then((response) => {
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
              title: 'Error occurred',
              text: response.data.message,
            });
            setLoading(false);
          }
          setEmail('');
          setFirstName('');
          setLastName('');
          setPassword('');
          setPhone('');
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Error occurred',
              text: error.response.data.message,
            });
            setLoading(false);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error occurred',
              text: error.response.data.message,
            });
            setLoading(false);
          }
        });
    }
  };

  return (
    <div className="admin-signup-container">
      <h2 className="admin-signup-heading">Admin Registration</h2>
      <form className="admin-signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="admin-custom-label" htmlFor="firstName">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(ev) => { setFirstName(ev.target.value); }}
            className="admin-custom-form"
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label className="admin-custom-label" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(ev) => { setLastName(ev.target.value); }}
            className="admin-custom-form"
            id="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label className="admin-custom-label" htmlFor="phone">Phone no.</label>
          <input
            type="phone"
            value={phone}
            maxLength={10}
            onChange={(ev) => { setPhone(ev.target.value); }}
            className="admin-custom-form"
            id="phone"
            placeholder="Phone no."
          />
        </div>
        <div className="form-group">
          <label className="admin-custom-label" htmlFor="email">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(ev) => { setEmail(ev.target.value); }}
            className="admin-custom-form"
            id="email"
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group">
          <label className="admin-custom-label" htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(ev) => { setPassword(ev.target.value); }}
            className="admin-custom-form"
            id="password"
            placeholder="Password"
          />
        </div>
        {loading ? (
          <div className="col-md-12 mt-3 text-center">
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <button className="admin-submit-button" type="submit">
              Register
            </button>
          </div>
        )}
      </form>
      {!loading && (
        <div className="admin-login-link-container">
          <p> Already an Admin?</p>
          <button className="admin-login-link" onClick={() => { handleLogin(); }}>
            Login here!
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSignup;
