import React, { useState } from 'react';
import './Dashboard.css';
import StatsCard from '../../components/dashboard/StatsCard';
import SalesAnalytics from '../../components/dashboard/SalesAnalytics';
import RecentActivity from '../../components/dashboard/RecentActivity';
import EmployeesTable from '../../components/employee/EmployeesTable';
import { FaUserCheck, FaUserTie, FaUserFriends, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  // Mock data for demonstration
  const [employees] = useState([
    {
      _id: '1',
      name: 'Tanner Finsha',
      employeeId: '#23454GH6JYT6',
      assignedLeads: 5,
      closedLeads: 2,
      status: 'Active'
    },
    {
      _id: '2',
      name: 'Emeto Winner',
      employeeId: '#23454GH6JYT6',
      assignedLeads: 3,
      closedLeads: 1,
      status: 'Active'
    },
    {
      _id: '3',
      name: 'Emeto Winner',
      employeeId: '#23454GH6JYT6',
      assignedLeads: 8,
      closedLeads: 3,
      status: 'Active'
    },
    {
      _id: '4',
      name: 'Tassy Omah',
      employeeId: '#23454GH6JYT6',
      assignedLeads: 6,
      closedLeads: 4,
      status: 'Active'
    }
  ]);

  // Calculate conversion rate
  const totalAssignedLeads = employees.reduce((sum, emp) => sum + (emp.assignedLeads || 0), 0);
  const totalClosedLeads = employees.reduce((sum, emp) => sum + (emp.closedLeads || 0), 0);
  const conversionRate = totalAssignedLeads > 0 ? ((totalClosedLeads / totalAssignedLeads) * 100).toFixed(1) + '%' : '0%';

  const [stats] = useState({
    unassignedLeads: '12',
    leadsAssignedThisWeek: '24',
    activeSalespeople: '5',
    conversionRate
  });

  const [analytics] = useState([
    { name: 'Mon', sales: 15, cumulativeSales: 15 },
    { name: 'Tue', sales: 22, cumulativeSales: 37 },
    { name: 'Wed', sales: 18, cumulativeSales: 55 },
    { name: 'Thu', sales: 25, cumulativeSales: 80 },
    { name: 'Fri', sales: 30, cumulativeSales: 110 },
    { name: 'Sat', sales: 12, cumulativeSales: 122 },
    { name: 'Sun', sales: 8, cumulativeSales: 130 }
  ]);

  const [activities] = useState([
    { id: 1, text: 'Admin User assigned lead Alice Johnson to John Smith - 1 hour ago' },
    { id: 2, text: 'John Smith closed lead Carlos Rodriguez - 2 hours ago' },
    { id: 3, text: 'Admin User added new employee Maria Garcia - 3 hours ago' },
    { id: 4, text: 'Sarah Johnson updated lead status to hot - 4 hours ago' },
    { id: 5, text: 'David Chen scheduled call with Li Wei - 5 hours ago' }
  ]);

  return (
    <div className="dashboard">
      <div className="stats-container">
        <StatsCard title="Unassigned Leads" value={stats.unassignedLeads} icon={FaUserCheck} iconBg="#e9f0fb" />
        <StatsCard title="Leads Assigned This Week" value={stats.leadsAssignedThisWeek} icon={FaUserTie} iconBg="#f7f3e7" />
        <StatsCard title="Active Salespeople" value={stats.activeSalespeople} icon={FaUserFriends} iconBg="#eaf7f0" />
        <StatsCard title="Conversion Rate" value={stats.conversionRate} icon={FaChartLine} iconBg="#f3eaf7" />
      </div>
      <div className="dashboard-main">
        <div className="dashboard-chart-area">
            <SalesAnalytics data={analytics} />
        </div>
        <div className="dashboard-activity-area">
            <RecentActivity activities={activities} />
        </div>
      </div>
      <EmployeesTable employees={employees} showStatus />
    </div>
  );
};

export default Dashboard; 