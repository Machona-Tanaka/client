import { useState } from 'react';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="settings-section">
      <h2>Account Information</h2>
      
      <div className="setting-item">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
      </div>
      
      <div className="setting-item">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      
      <h3>Change Password</h3>
      
      <div className="setting-item">
        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Enter current password"
        />
      </div>
      
      <div className="setting-item">
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
        />
      </div>
      
      <div className="setting-item">
        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
        />
      </div>
      
      <div className="settings-actions">
        <button className="btn btn-primary">Update Account</button>
      </div>
    </div>
  );
};

export default AccountSettings;