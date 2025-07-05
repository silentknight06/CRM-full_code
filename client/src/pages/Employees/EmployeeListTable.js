import React, { useState } from 'react';
import './EmployeeListTable.css';
import Pagination from '../../components/ui/Pagination';

const EmployeeListTable = ({ employees, setEmployees }) => {
    const [openMenuId, setOpenMenuId] = useState(null);

    const handleMenuToggle = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleEdit = (emp) => {
        alert(`Edit employee: ${emp.name}`);
        setOpenMenuId(null);
    };

    const handleDelete = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
        setOpenMenuId(null);
    };

    const getStatusClass = (status) => status === 'Active' ? 'status-active' : 'status-inactive';
    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <div className="table-container">
      <table className="employee-list-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Assigned Leads</th>
            <th>Closed Leads</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id || emp._id}>
              <td><input type="checkbox" /></td>
              <td>
                <div className="employee-info">
                    <div className="employee-avatar">{getInitials(emp.name)}</div>
                    <div>
                        <div>{emp.name}</div>
                        <div className="employee-email">{emp.email}</div>
                    </div>
                </div>
              </td>
              <td className="employee-id-cell">{emp.employeeId}</td>
              <td>{emp.assignedLeads}</td>
              <td>{emp.closedLeads}</td>
              <td><span className={getStatusClass(emp.status)}>{emp.status}</span></td>
              <td className="actions-cell">
                <button className="actions-btn" onClick={() => handleMenuToggle(emp.id || emp._id)}>&hellip;</button>
                {openMenuId === (emp.id || emp._id) && (
                    <div className="actions-menu">
                        <button onClick={() => handleEdit(emp)}><span>✏️</span> Edit</button>
                        <button onClick={() => handleDelete(emp.id || emp._id)}><span>🗑️</span> Delete</button>
                    </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default EmployeeListTable; 