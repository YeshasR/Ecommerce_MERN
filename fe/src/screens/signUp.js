import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import UserRegistrationPage from './User_signup';
import AdminRegistrationPage from './adminSignup';
import '../styles/Signup.css';

function Signup() {
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const renderRegistrationForm = () => {
    if (userType === 'user') {
      return <UserRegistrationPage />;
    }
    if (userType === 'admin') {
      return <AdminRegistrationPage />;
    }
    return null;
  };

  return (
    <div>
      <Header />
      <div className="registration-container">
        <h1 className="text-center mt-3">Registration Page</h1>
        <div className="text-center mb-4">
          <select className="signupSelect" value={userType} onChange={handleUserTypeChange}>
            <option value="null">Select an option to register</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {renderRegistrationForm()}
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
