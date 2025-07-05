import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Home from '../../pages/Dashboard/Dashboard';
import Leads from '../../pages/Leads/Leads';
import Employees from '../../pages/Employees/Employees';
import Settings from '../../pages/Settings/Settings';

const mockUser = {
  firstName: 'Deepak',
  lastName: 'kumar',
  email: 'Deepak@gmail.com',
  role: 'admin',
  location: 'New York',
  preferredLanguage: 'English',
  status: 'active'
};

const AppLayout = () => {
  return (
    <div className="app-container">
      <Sidebar user={mockUser} />
      <div className="main-content">
        <Header user={mockUser} />
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout; 