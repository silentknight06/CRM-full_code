import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection-container">
      <h1>Welcome to CanovaCRM</h1>
      <p>Select your role to continue:</p>
      <div className="role-buttons">
        <button className="role-btn admin" onClick={() => navigate('/dashboard')}>Admin</button>
        <button className="role-btn employee" onClick={() => navigate('/employee-home')}>Employee</button>
      </div>
    </div>
  );
};

export default RoleSelection; 