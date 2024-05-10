import React, { useState } from 'react';
import Axios from 'axios';
import StudentLogin from './StudentLogin';
import AdminLogin from './AdminLogin';
import "./Signup.css";

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to 'student'
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [signedUp, setSignedUp] = useState(false); // State to track if signed up

  const insert = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setFormError('All fields are required.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    // Clear previous form error
    setFormError('');

    // Send signup data to the server
    Axios.get(`http://127.0.0.1:4002/api/signup`, {
      params: { username, email, password, confirmPassword, user: userType }
    })
      .then((response) => {
        // Handle successful signup
        alert('Signup successful!');
        // Update state to indicate signed up
        setSignedUp(true);
      })
      .catch((error) => {
        // Handle signup error
        console.error('Signup error:', error);
        alert('Error occurred during signup. Please try again.');
      });
  };

  if (signedUp) {
    // Render login component based on user type
    return userType === 'student' ? <StudentLogin /> : <AdminLogin />;
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    // Password validation logic (same as before)
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center ">SignUp Form</h2>
      <form onSubmit={insert} className="mx-auto" style={{ maxWidth: '300px' }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label"><strong>Username:</strong></label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label"><strong>Confirm Password:</strong></label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userType" className="form-label"><strong>User Type:</strong></label>
          <select
            className="form-control"
            id="userType"
            value={userType}
            onChange={handleUserTypeChange}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {passwordError && <div className="text-danger">{passwordError}</div>}
        {formError && <div className="text-danger">{formError}</div>}
        <button type="submit" className="btn btn-primary d-block mx-auto">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
