import React from 'react';
import { useNavigate } from 'react-router-dom';

// Student login component
function StudentLogin() {
  // Add your student login logic here
}

// Admin login component
function AdminLogin() {
  // Add your admin login logic here
}

// Main login component
function Login({ userType }) {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/login/student');
  };

  const handleAdminLogin = () => {
    navigate('/login/admin');
  };

  return (
    <div className="container  d-flex flex-column  justify-content-center align-items-center mt-5">
      <h1>Welcome Techies!!!</h1>
      {userType === 'student' ? <StudentLogin /> : <AdminLogin />}
      <div className="mt-3">
        <button className="btn btn-success me-2" onClick={handleStudentLogin}>Student Login</button>
        <button className="btn btn-info me-2" onClick={handleAdminLogin}>Admin Login</button>
        {/* <span>Don't have an account? <button className="btn btn-secondary" onClick={handleSignup}>Signup</button></span> */}
      </div>
    </div>
  );
}

export default Login;
