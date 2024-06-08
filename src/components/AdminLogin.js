import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios'; // Import Axios for making HTTP requests
import "./AdminLogin.css"

function AdminLogin() {
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
  // If loggedIn is true, navigate to admin dashboard
  return <Navigate to="/admin/StudentList" />;
}

return (
  <div className="row justify-content-center mt-5 ">
    <div className="col-md-3 ">
      <h2 className=" animate__animated animate__bounceIn">Admin Login</h2>
      <form >
        <div className="mb-3 animate__animated animate__backInRight animate__delay-1s">
          <label htmlFor="username" className="form-label"><strong>Username:</strong></label>
          <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3 animate__animated animate__backInLeft animate__delay-1s">
          <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary  animate__animated animate__backInRight animate__delay-2s" onClick={login}>Login</button>
        {error && <div className="text-danger mt-2">{error}</div>}
        {/* Add links to student login and signup */}
        <div className="mt-3 ">
          <Link to="/login/student" className="btn btn-info animate__animated animate__backInLeft animate__delay-3s">Student Login</Link>
          <Link to="/signup" className="btn btn-success mx-3 animate__animated animate__backInRight animate__delay-4s">Signup</Link>
        </div>
      </form>
    </div>
    
  </div>
);
}

export default AdminLogin;

// import React, { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import Axios from 'axios'; // Import Axios for making HTTP requests

// function AdminLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [error, setError] = useState('');

//   const login = (event) => {
//     event.preventDefault();
//     // Check if all fields are filled
//     if (!username  || !password) {
//       setError('All fields are required.');
//       return;
//     }

//     // Send login data to the server
//     Axios.get(`http://127.0.0.1:4002/api/login`, {
//       params: { username, password }
//     })
//     .then((response) => {
//       console.log(response.data)
//       if (response.data.success) {
//         // If login is successful, set loggedIn state to true
//         setLoggedIn(true);
//       } else {
//         // If login fails, display error message
//         setError("Invalid username or password");
//       }
//     })
//     .catch ((error) =>{
//       console.error('Error occurred during login:', error);
//       setError('An error occurred during login. Please try again.');
//     })
//   }

//   if (loggedIn) {
//     // If loggedIn is true, navigate to admin dashboard
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return (
//     <div className="row justify-content-center mt-5">
//       <div className="col-md-6">
//         <h2>Admin Login</h2>
//         <form >
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">Username</label>
//             <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <button className="btn btn-primary" onClick={login}>Login</button>
//           {error && <div className="text-danger mt-2">{error}</div>}
//           {/* Add links to student login and signup */}
//           <div className="mt-3">
//             <Link to="/login/student" className="btn btn-info me-2 ms-2">Student Login</Link>
//             <Link to="/signup" className="btn btn-success me-2">Signup</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;

// import React, { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import Axios from 'axios'; // Import Axios for making HTTP requests

// function AdminLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [error, setError] = useState('');

//   const login = (event) => {
//     event.preventDefault();
//     // Check if all fields are filled
//     if (!username  || !password) {
//       setError('All fields are required.');
//       return;
//     }

//     // // Check if passwords match
//     // if (password !== confirmPassword) {
//     //   setFormError('Passwords do not match.');
//     //   return;
//     // }

//     // Clear previous forma error
//     // setFormError('');

//     // Send signup data to the server
//     Axios.get(`http://127.0.0.1:4002/api/login`, {
//       params: { username, password }
//     })
//     .then((response) => {
//       console.log(response.data)
//       // console.log(response.success)
//       if ((response.data).length > 0) {
//         // If a matching user is found, return success message and user data
//         return { success: true, message: "Login successful" };
//         alert(response.data.message)
//     } else {
//         // If no matching user is found, return error message
//         alert("Invalid username or password")
//         return { success: false, message: "Invalid username or password" };
//     }
//   })
    
//      .catch ((error) =>{
//       console.error('Error occurred during login:', error);
//       setError('An error occurred during login. Please try again.');
//     })
//   }
  
    
    

//   if (loggedIn) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return (
//     <div className="row justify-content-center mt-5">
//       <div className="col-md-6">
//         <h2>Admin Login</h2>
//         <form >
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">Username</label>
//             <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <button  className="btn btn-primary"onClick={login}>Login</button>
//           {error && <div className="text-danger mt-2">{error}</div>}
//           {/* Add links to student login and signup */}
//           <div className="mt-3">
//             <Link to="/login/student" className="btn btn-info me-2 ms-2">Student Login</Link>
//             <Link to="/signup" className="btn btn-success me-2">Signup</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;

// // import React, { useState } from 'react';
// // import { Link, Navigate } from 'react-router-dom';

// // function AdminLogin() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [loggedIn, setLoggedIn] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Implement your login logic here
// //     // For example, check username and password against a database
// //     // If credentials are correct, setLoggedIn(true)
// //   };

// //   if (loggedIn) {
// //     return <Navigate to="/admin/dashboard" />;
// //   }

// //   return (
// //     <div className="row justify-content-center mt-5">
// //       <div className="col-md-6">
// //         <h2>Admin Login</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <label htmlFor="username" className="form-label">Username</label>
// //             <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="password" className="form-label">Password</label>
// //             <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //           </div>
// //           <button type="submit" className="btn btn-primary">Login</button>
// //           {/* Add links to student login and signup */}
// //           <div className="mt-3">
// //             <Link to="/login/student" className="btn btn-info me-2 ms-2">Student Login</Link>
// //             <Link to="/signup" className="btn btn-success me-2">Signup</Link>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminLogin;
