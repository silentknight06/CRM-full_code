import React, { useState } from 'react';
import './AddEmployeeForm.css';

const emptyEmployee = {
    firstName: '',
    lastName: '',
    email: '',
    location: 'Bareilly',
    language: 'English',
};

const AddEmployeeForm = ({ onCancel, onSave }) => {
    const [employees, setEmployees] = useState([{ ...emptyEmployee }]);

    const handleChange = (idx, field, value) => {
        setEmployees(prev => prev.map((emp, i) => i === idx ? { ...emp, [field]: value } : emp));
    };

    const handleAddEmployee = () => {
        setEmployees(prev => [...prev, { ...emptyEmployee }]);
    };

    const handleRemoveEmployee = (idx) => {
        setEmployees(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const newEmployees = employees.map(emp => ({
            name: `${emp.firstName} ${emp.lastName}`.trim(),
            email: emp.email,
            location: emp.location,
            preferredLanguage: emp.language,
            assignedLeads: 0,
            closedLeads: 0,
            status: 'Active',
        }));
        if (onSave) onSave(newEmployees);
        onCancel();
    };

    return (
        <div className="add-employee-form">
            <div className="modal-header">
                <h3>Add New Employee</h3>
                <button onClick={onCancel} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleSave}>
                {employees.map((emp, idx) => (
                    <div className="employee-form-group" key={idx} style={{ marginBottom: 24, borderBottom: idx !== employees.length - 1 ? '1px solid #eee' : 'none', paddingBottom: 16 }}>
                        <div className="form-group">
                            <label htmlFor={`first-name-${idx}`}>First name</label>
                            <input type="text" id={`first-name-${idx}`} value={emp.firstName} onChange={e => handleChange(idx, 'firstName', e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`last-name-${idx}`}>Last name</label>
                            <input type="text" id={`last-name-${idx}`} value={emp.lastName} onChange={e => handleChange(idx, 'lastName', e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`email-${idx}`}>Email</label>
                            <input type="email" id={`email-${idx}`} value={emp.email} onChange={e => handleChange(idx, 'email', e.target.value)} required />
                        </div>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor={`location-${idx}`}>Location</label>
                                <select id={`location-${idx}`} value={emp.location} onChange={e => handleChange(idx, 'location', e.target.value)}>
                                    <option>Bareilly</option>
                                    <option>Karnataka</option>
                                    <option>California</option>
                                </select>
                            </div>
                            <span className="tooltip">Lead will be assigned on biases on location</span>
                        </div>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor={`language-${idx}`}>Preferred Language</label>
                                <select id={`language-${idx}`} value={emp.language} onChange={e => handleChange(idx, 'language', e.target.value)}>
                                    <option>English</option>
                                    <option>Tamil</option>
                                </select>
                            </div>
                            <span className="tooltip">Lead will be assigned on biases on language</span>
                        </div>
                        {employees.length > 1 && (
                            <button type="button" className="remove-employee-btn" onClick={() => handleRemoveEmployee(idx)} style={{ color: 'red', marginTop: 8 }}>Remove</button>
                        )}
                    </div>
                ))}
                <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button type="button" className="add-another-btn" onClick={handleAddEmployee} style={{ marginRight: 16 }}>+ Add Another Employee</button>
                    <button type="submit" className="save-btn">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployeeForm; 