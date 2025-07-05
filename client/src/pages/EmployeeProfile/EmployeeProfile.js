import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Profile saved!');
  };

  return (
    <div className="employee-profile-page">
      <nav className="employee-nav">
        <div className="nav-item" onClick={() => navigate('/employee-home')}>
          <p>🏠</p>
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/employee-leads')}>
          <p>👥</p>
          <span>Leads</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/employee-schedule')}>
          <p>📅</p>
          <span>Schedule</span>
        </div>
        <div className="nav-item active" onClick={() => navigate('/employee-profile')}>
          <p>👤</p>
          <span>Profile</span>
        </div>
      </nav>
      
      <main className="profile-main-content">
        <div className="header-blue">
          <div className="logo">CanovaCRM</div>
          <div className="page-title">
            <button className="back-btn" onClick={() => navigate(-1)}>{'<'}</button>
            <h1>Profile</h1>
          </div>
        </div>

        <div className="profile-content-wrapper">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" defaultValue="Deepak" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" defaultValue="Kumar" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" defaultValue="deepak@gmail.com" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" defaultValue="************" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" defaultValue="************" />
            </div>
            <button type="submit" className="save-btn">Save</button>
          </form>
        </div>
      </main>

    </div>
  );
};

export default EmployeeProfile; 