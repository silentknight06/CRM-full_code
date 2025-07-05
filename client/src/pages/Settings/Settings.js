import React from 'react';
import './Settings.css';

const Settings = () => {
    return (
        <div className="settings-page">
            <h2 className="page-title">Profile Settings</h2>
            <div className="settings-container">
                <form className="profile-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first-name">First name</label>
                            <input type="text" id="first-name" defaultValue="Deepak" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last-name">Last name</label>
                            <input type="text" id="last-name" defaultValue="Kumar" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" defaultValue="Deepak@gmail.com" />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter new password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" placeholder="Confirm new password" />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings; 