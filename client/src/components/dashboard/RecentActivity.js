import React from 'react';
import './RecentActivity.css';

const activityTypes = [
  'assigned lead',
  'closed lead',
  'added lead',
  'added new lead',
  'adding of a lead',
  'adding a lead',
  'added new employee', // fallback for possible variations
];

const isRelevantActivity = (text = '') => {
  const lower = text.toLowerCase();
  return (
    lower.includes('assigned lead') ||
    lower.includes('closed lead') ||
    lower.includes('adding of a lead') ||
    lower.includes('added lead') ||
    lower.includes('added new lead')
  );
};

const RecentActivity = ({ activities = [] }) => {
  // Filter for relevant activities and take top 10
  const filtered = activities.filter(a => isRelevantActivity(a.text)).slice(0, 10);

  if (!filtered || filtered.length === 0) {
    return (
      <div className="recent-activity">
        <h4>Recent Activity Feed</h4>
        <p className="no-activities">No recent activities</p>
      </div>
    );
  }

  return (
    <div className="recent-activity">
      <h4>Recent Activity Feed</h4>
      <ul>
        {filtered.map(activity => (
          <li key={activity.id}>{activity.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity; 