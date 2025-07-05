import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AppLayout from './components/layout/AppLayout';
import EmployeeHome from './pages/EmployeeHome/EmployeeHome';
import RoleSelection from './pages/RoleSelection/RoleSelection';
import EmployeeLeads from './pages/EmployeeLeads/EmployeeLeads';
import EmployeeSchedule from './pages/EmployeeSchedule/EmployeeSchedule';
import EmployeeProfile from './pages/EmployeeProfile/EmployeeProfile';
import Login from './pages/Login/Login';

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/employee-home" element={<EmployeeHome />} />
        <Route path="/employee-leads" element={<EmployeeLeads />} />
        <Route path="/employee-schedule" element={<EmployeeSchedule />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
