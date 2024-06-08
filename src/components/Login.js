import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';
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
    <div className="container1  d-flex flex-column  justify-content-center align-items-center mt-5">
       <h1 className="text-center mb-4">Welcome Techies!!!</h1>
      {userType === 'student' ? <StudentLogin /> : <AdminLogin />}
      <div className="mt-3">
        <button className="btn btn-success center me-2 animate__animated animate__backInLeft  animate__delay-3s" onClick={handleStudentLogin}>Student Login</button>
        <button className="btn btn-info  center me-2 animate__animated animate__backInRight  animate__delay-3s" onClick={handleAdminLogin}>Admin Login</button>
        {/* <span>Don't have an account? <button className="btn btn-secondary" onClick={handleSignup}>Signup</button></span> */}
      </div>
    </div>
  );
}

export default Login;
