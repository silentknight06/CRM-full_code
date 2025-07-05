import React from 'react';
import './LeadList.css';

const LeadList = ({ leads = [] }) => {
  const uploadedFiles = leads.length > 0 ? leads : [
    {
      no: '01',
      name: 'CSV0225',
      date: '01/03/2025',
      numLeads: 250,
      assignedLeads: 213,
      unassignedLeads: 30,
    },
  ];

  return (
    <div className="leads-list-table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Date</th>
            <th>No. of Leads</th>
            <th>Assigned Leads</th>
            <th>Unassigned Leads</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, idx) => (
            <tr key={file.no || idx}>
              <td>{file.no || idx + 1}</td>
              <td>{file.name}</td>
              <td>{file.date}</td>
              <td>{file['No. of Leads'] || file.numLeads}</td>
              <td>{file['Assigned Leads'] || file.assignedLeads}</td>
              <td>{file['Unassigned Leads'] || file.unassignedLeads}</td>
              <td>
                <button className="action-btn">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadList; 