import React from 'react';
import './EmployeesTable.css';

const EmployeesTable = ({ employees = [], showStatus }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="employees-table-container">
        <p className="no-employees">No employees found</p>
      </div>
    );
  }

  return (
    <div className="employees-table-container">
      <div className="employees-table">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" aria-label="Select all employees" />
              </th>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Assigned Leads</th>
              <th>Closed Leads</th>
              {showStatus && <th>Status</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>
                  <input type="checkbox" aria-label={`Select employee ${employee.name}`} />
                </td>
                <td>{employee.name}</td>
                <td className="employee-id-cell">{employee.employeeId || employee._id}</td>
                <td>{employee.assignedLeads}</td>
                <td>{employee.closedLeads}</td>
                {showStatus && (
                  <td>
                    <span className="employee-status-dot" />
                    <span className="employee-status-text">{employee.status}</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;