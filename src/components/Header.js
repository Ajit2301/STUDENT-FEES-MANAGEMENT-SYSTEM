import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">STUDENTS FEES MANAGEMENT SYSTEM</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Admin Dashboard
              </Link>
              <ul className="dropdown-menu" aria-labelledby="adminDropdown bg-primary">
                <li><Link className="dropdown-item" to="/admin/studentList">StudentList</Link></li>
                <li><Link className="dropdown-item" to="/admin/invoiceCreate">InvoiceCreate</Link></li>
                <li><Link className="dropdown-item" to="/admin/invoicesfind">Invoices</Link></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
