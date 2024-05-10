import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios'; // Import Axios for making HTTP requests
import "./StudentLogin.css";
function StudentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);  
  const [error, setError] = useState('');



  const login = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    if (!username || !password) {
      setError('All fields are required.');
      return;
    }
  
    // Send login data to the server
    Axios.get(`http://127.0.0.1:4002/api/login`, {
      params: { username, password }
    })
    .then((response) => {
      console.log(response.data.users[0]);
      // Check if any user with matching username and password is found
      if (response.data.users[0] ) {
        // If login is successful, set loggedIn state to true
        alert("login successfull")
        setLoggedIn(true);
      } else {
        // If login fails, display error message
        setError("Invalid username or password");
      }
    })
    .catch ((error) => {
      console.error('Error occurred during login:', error);
      setError('An error occurred during login. Please try again.');
    });
  }
  
  
  
  
  if (loggedIn) {
    return <Navigate to="/admin/invoicesfind"/>
  
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-3">
        <h2>Student Login</h2>
        <form style={{ maxWidth: '300px' }}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label"><strong>Username:</strong></label>
            <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
          {error && <div className="text-danger mt-2">{error}</div>}
          {/* Add links to admin login and signup */}
          <div className="mt-3">
            <Link to="/login/admin" className="btn btn-success me-2">Admin Login</Link>
            <Link to="/signup" className="btn btn-info me-2">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
