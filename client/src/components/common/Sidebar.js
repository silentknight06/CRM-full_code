import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>
          <span style={{ color: '#222', fontWeight: 'bold' }}>Canova</span>
          <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>CRM</span>
        </h2>
      </div>
      <ul className="sidebar-menu">
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
        <li><NavLink to="/leads" className={({ isActive }) => isActive ? 'active' : ''}>Leads</NavLink></li>
        <li><NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>Employees</NavLink></li>
        <li><NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink></li>
      </ul>
      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={() => navigate('/role-selection')}>
          <span className="logout-icon" role="img" aria-label="logout">&#8592;</span> Logout
        </button>
        <p className="profile-label" style={{ fontWeight: 'bold' }}>Profile</p>
      </div>
    </div>
  );
};

export default Sidebar; 