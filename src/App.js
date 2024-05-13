import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import "./Header.css";
import "./Login.css";
import "./Signup.css";
import Header from './components/Header';
import AdminDashboard from './components/AdminDashBoard';
import StudentLogin from './components/StudentLogin';
import StudentList from "./components/StudentList";
import AdminLogin from './components/AdminLogin';
import Login from './components/Login';
import Signup from './components/Signup';
import Courses from './components/Courses';
import InvoiceCreate from './components/InvoiceCreate';
import GenerateInvoice from './components/GenerateInvoice';
import Invoices from './components/Invoices'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <div className="bg-image " >
      <Header />
      <div className="container ">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/invoiceCreate" element={<InvoiceCreate />} />
          <Route path="/admin/studentList" element={<StudentList />} />
          <Route path="/admin/invoices" element={<GenerateInvoice />} />
          <Route path="/admin/invoicesfind" element={<Invoices />} />
          <Route path="/login" element={<Login />} /> {/* New route for login */}
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
