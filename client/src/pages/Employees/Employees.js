import React, { useState } from 'react';
import './Employees.css';
import EmployeeListTable from './EmployeeListTable';
import Modal from '../../components/common/Modal';
import AddEmployeeForm from './AddEmployeeForm';
import { employeesAPI } from '../../services/api';

const initialEmployees = [
  { id: 1, name: 'Tanner Finsha', email: '@tannerfisher@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 5, closedLeads: 2, status: 'Active' },
  { id: 2, name: 'Emeto Winner', email: 'emetowinner@gmail.com', employeeId: '#23454GH8J7YT6', assignedLeads: 3, closedLeads: 1, status: 'Active' },
  { id: 3, name: 'Tassy Omah', email: 'tassyomah@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 5, closedLeads: 0, status: 'Inactive' },
  { id: 4, name: 'James Muriel', email: 'jamesmuriel@aerten.finance', employeeId: '#23454GH6J7YT6', assignedLeads: 2, closedLeads: 0, status: 'Inactive' },
  { id: 5, name: 'Emeto Winner', email: 'emetowinner@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 1, closedLeads: 0, status: 'Inactive' },
  { id: 6, name: 'Tassy Omah', email: 'tassyomah@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 8, closedLeads: 3, status: 'Active' },
  { id: 7, name: 'James Muriel', email: 'jamesmuriel@aerten.finance', employeeId: '#23454GH6J7YT6', assignedLeads: 6, closedLeads: 4, status: 'Active' },
  { id: 8, name: 'Emeto Winner', email: 'emetowinner@gmail.com', employeeId: '#23454GH6J7YT6', assignedLeads: 4, closedLeads: 0, status: 'Inactive' },
];

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState(initialEmployees);

  const handleAddEmployee = async (employeeData) => {
    try {
      const newEmployee = await employeesAPI.create(employeeData);
      setEmployees(prev => [
        { ...employeeData, ...newEmployee, id: newEmployee._id || Date.now() },
        ...prev
      ]);
    } catch (err) {
      alert('Failed to add employee. ' + (err.message || ''));
    }
  };

  return (
    <div className="employees-page">
      <div className="page-header">
        <div className="breadcrumbs">
          Home &gt; Employees
        </div>
        <button className="add-employees-btn" onClick={() => setIsModalOpen(true)}>Add Employees</button>
      </div>
      <EmployeeListTable employees={employees} setEmployees={setEmployees} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddEmployeeForm onCancel={() => setIsModalOpen(false)} onSave={handleAddEmployee} />
      </Modal>
    </div>
  );
};

export default Employees; 